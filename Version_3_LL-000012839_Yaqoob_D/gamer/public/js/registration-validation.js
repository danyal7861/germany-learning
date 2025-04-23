/**
 * Form validation script for registration page
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Form elements
        const form = document.getElementById('registrationForm');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');
        const strengthMeter = document.getElementById('password-strength-meter');
        const feedback = document.getElementById('password-feedback');
        const confirmFeedback = document.getElementById('confirm-feedback');
        const nameInput = document.getElementById('name');
        const nameFeedback = document.getElementById('name-feedback');
        const charCount = document.getElementById('char-count');

        // Password validation function
        function validatePassword() {
            const password = passwordInput.value;
            const hasSpecialChar = /[!@#$%^&*]/g.test(password);
            const isValidLength = password.length >= 8 && password.length <= 128;
            let isValid = hasSpecialChar && isValidLength;
            
            // Update character count
            charCount.textContent = password.length + '/128';
            
            // Show limit message when max length is reached
            if (password.length === 128) {
                charCount.textContent = '128/128 - Character limit reached';
                charCount.className = 'form-text text-danger';
            } else {
                charCount.className = 'form-text text-muted';
            }
            
            // Strength calculation
            let strength = 0;
            if (password.length >= 4) strength += 25;
            if (password.length >= 8) strength += 25;
            if (hasSpecialChar) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            
            // Update UI
            strengthMeter.style.width = strength + '%';
            
            // Set validation state
            passwordInput.setCustomValidity(isValid ? '' : 'Password requirements not met');
            
            // Update feedback
            if (!hasSpecialChar) {
                feedback.textContent = 'Missing special character (!@#$%^&*)';
                feedback.className = 'form-text text-danger';
            } else if (!isValidLength) {
                feedback.textContent = 'Password must be 8-128 characters';
                feedback.className = 'form-text text-danger';
            } else if (strength < 75) {
                feedback.textContent = 'Password acceptable (add uppercase for stronger)';
                feedback.className = 'form-text text-warning';
            } else {
                feedback.textContent = 'Strong password';
                feedback.className = 'form-text text-success';
            }
            
            // Update strength meter color
            if (strength < 50) {
                strengthMeter.className = 'progress-bar bg-danger';
            } else if (strength < 75) {
                strengthMeter.className = 'progress-bar bg-warning';
            } else {
                strengthMeter.className = 'progress-bar bg-success';
            }
            
            return isValid;
        }
        
        // Confirm password validation
        function validateConfirmPassword() {
            const isMatch = passwordInput.value === confirmPasswordInput.value;
            
            if (confirmPasswordInput.value.length > 0) {
                confirmPasswordInput.setCustomValidity(isMatch ? '' : 'Passwords do not match');
                confirmFeedback.textContent = isMatch ? 'Passwords match' : 'Passwords do not match';
                confirmFeedback.className = isMatch ? 'form-text text-success' : 'form-text text-danger';
            } else {
                confirmPasswordInput.setCustomValidity('');
                confirmFeedback.textContent = '';
            }
            
            return isMatch || confirmPasswordInput.value.length === 0;
        }
        
        // Name validation function
        function validateName() {
            const name = nameInput.value;
            const isValid = /^[A-Za-z\s]*$/.test(name);
            
            nameInput.setCustomValidity(!isValid && name.length > 0 ? 'Name should only contain letters and spaces' : '');
            
            if (!isValid && name.length > 0) {
                nameFeedback.textContent = 'Only letters and spaces allowed';
                nameFeedback.className = 'form-text text-danger';
                return false;
            } else {
                nameFeedback.textContent = 'Only letters and spaces allowed';
                nameFeedback.className = 'form-text text-muted';
                return true;
            }
        }

        // Set up event listeners
        if (passwordInput && strengthMeter) {
            passwordInput.addEventListener('input', validatePassword);
            passwordInput.addEventListener('blur', validatePassword);
        }
        
        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', validateConfirmPassword);
            confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
        }
        
        if (nameInput) {
            nameInput.addEventListener('input', validateName);
            nameInput.addEventListener('blur', validateName);
        }
        
        // Form submission handler
        form.addEventListener('submit', function(event) {
            // Run all validations
            const validations = [
                passwordInput && validatePassword(),
                confirmPasswordInput && validateConfirmPassword(),
                nameInput && validateName()
            ];
            
            // If any validation fails, prevent form submission
            if (validations.includes(false)) {
                event.preventDefault();
            }
        });
        
        // Initial validation
        if (passwordInput) validatePassword();
    });
})();