// Contact Form Enhancement
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.contacto-form form');

    forms.forEach(form => {
        const submitBtn = form.querySelector('.submit-btn');
        const inputs = form.querySelectorAll('input, textarea');

        // Add floating label effect
        inputs.forEach(input => {
            // Check if input has value on load (e.g., autofill)
            if (input.value) {
                input.classList.add('has-value');
            }

            // Add/remove class on focus and blur
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value) {
                    this.classList.add('has-value');
                } else {
                    this.classList.remove('has-value');
                }
            });

            // Real-time validation feedback
            input.addEventListener('input', function() {
                validateField(this);
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Validate all fields before submit
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('Por favor, completa todos los campos correctamente.', 'error');
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            const originalText = submitBtn.textContent;
            submitBtn.textContent = submitBtn.closest('.contacto').querySelector('h2').textContent.includes('Work')
                ? 'Sending...'
                : 'Enviando...';

            // Note: FormSubmit will handle the actual submission
            // The loading state will show until the page redirects
        });
    });

    // Field validation function
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const formGroup = field.parentElement;

        // Remove previous error
        removeError(formGroup);

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            showError(formGroup, 'Este campo es requerido');
            return false;
        }

        // Email validation
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(formGroup, 'Por favor, ingresa un email válido');
                return false;
            }
        }

        // Text length validation
        if (type === 'text' && value && value.length < 2) {
            showError(formGroup, 'Por favor, ingresa al menos 2 caracteres');
            return false;
        }

        // Textarea validation
        if (field.tagName === 'TEXTAREA' && value && value.length < 10) {
            showError(formGroup, 'Por favor, ingresa al menos 10 caracteres');
            return false;
        }

        // If all validations pass, show success
        formGroup.classList.add('valid');
        return true;
    }

    function showError(formGroup, message) {
        formGroup.classList.add('error');
        formGroup.classList.remove('valid');

        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function removeError(formGroup) {
        formGroup.classList.remove('error');
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Add to body
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Check for success parameter in URL (after form submission)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showNotification('¡Mensaje enviado exitosamente! Te contactaré pronto.', 'success');
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});
