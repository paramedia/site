/**
 * Referral Handlers Script
 * This file contains functions for handling referral system operations
 * including split initialization, link copying, and global error handling
 */

// Initialize Split System
function initSplitSystem() {
  // Wait for Memberstack to be available
  if (window.$memberstackDom) {
    window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
      if (member) {
        const customFields = member.customFields;
        const splitElement = document.getElementById('currentSplit');
        
        // Update split percentage display if element exists
        if (splitElement && customFields && customFields.split) {
          const splitValue = parseFloat(customFields.split);
          splitElement.textContent = splitValue.toFixed(0) + '%';
        }
        
        // Initialize any other split-related UI elements
        updateSplitUI(customFields);
      }
    });
  }
}

// Update Split UI Elements
function updateSplitUI(customFields) {
  // Update any UI elements that depend on the split percentage
  const splitRelatedElements = document.querySelectorAll('[data-split-related]');
  
  if (customFields && customFields.split) {
    const splitValue = parseFloat(customFields.split);
    
    splitRelatedElements.forEach(element => {
      // Show/hide elements based on split value
      if (element.hasAttribute('data-min-split')) {
        const minSplit = parseFloat(element.getAttribute('data-min-split'));
        element.style.display = splitValue >= minSplit ? 'block' : 'none';
      }
    });
  }
}

// Copy Referral Link to Clipboard
function copyReferralLink(event) {
  event.preventDefault();
  
  const referralLink = document.getElementById('referralLink');
  if (!referralLink) return;
  
  const linkText = referralLink.value || referralLink.getAttribute('data-link') || referralLink.href || window.location.origin;
  
  // Create a temporary input element
  const tempInput = document.createElement('input');
  tempInput.value = linkText;
  document.body.appendChild(tempInput);
  
  // Select and copy the link
  tempInput.select();
  document.execCommand('copy');
  
  // Remove the temporary element
  document.body.removeChild(tempInput);
  
  // Show success message
  const copyButton = event.target.closest('button') || event.target;
  const originalText = copyButton.textContent;
  
  copyButton.textContent = 'Copied!';
  copyButton.classList.add('success');
  
  // Restore original button text after 2 seconds
  setTimeout(() => {
    copyButton.textContent = originalText;
    copyButton.classList.remove('success');
  }, 2000);
}

// Check Memberstack Plan
function checkMemberstackPlan(requiredPlanId) {
  return new Promise((resolve, reject) => {
    if (!window.$memberstackDom) {
      reject('Memberstack not available');
      return;
    }
    
    window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
      if (!member) {
        resolve(false);
        return;
      }
      
      // Check if user has the required plan
      const hasPlan = member.planConnections.some(plan => plan.planId === requiredPlanId);
      resolve(hasPlan);
    }).catch(error => {
      console.error('Error checking plan:', error);
      reject(error);
    });
  });
}

// Handle Global Error Events (for 500 errors)
function setupGlobalErrorHandler() {
  // Add global event listener for AJAX errors
  window.addEventListener('unhandledrejection', function(event) {
    // Check if the error is from a fetch or XHR request
    if (event.reason && 
        (event.reason.status === 500 || 
         (event.reason.message && event.reason.message.includes('500')))) {
      
      console.error('Server error 500 detected:', event.reason);
      
      // Refresh the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
  
  // Patch the fetch API to handle 500 errors
  const originalFetch = window.fetch;
  window.fetch = function() {
    return originalFetch.apply(this, arguments)
      .then(response => {
        if (response.status === 500) {
          console.error('Server error 500 detected in fetch');
          
          // Refresh the page after a short delay
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
          throw new Error('Server error 500');
        }
        return response;
      });
  };
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize split system
  initSplitSystem();
  
  // Set up click handlers for referral link copy buttons
  const copyButtons = document.querySelectorAll('.copy-referral-link');
  copyButtons.forEach(button => {
    button.addEventListener('click', copyReferralLink);
  });
  
  // Set up global error handler
  setupGlobalErrorHandler();
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initSplitSystem,
    copyReferralLink,
    checkMemberstackPlan,
    setupGlobalErrorHandler
  };
} 