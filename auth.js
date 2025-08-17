@@ .. @@
 // Form submission handlers
 function handleLoginSubmit(event) {
     event.preventDefault();
     
     const form = event.target;
     const formData = new FormData(form);
     const email = formData.get('email');
     const password = formData.get('password');
     
     // Validate form
     const emailValid = validateEmail({ target: form.querySelector('#email') });
     const passwordValid = validatePassword({ target: form.querySelector('#password') });
     
     if (!emailValid || !passwordValid) {
         return;
     }
     
     // Show loading state
     const submitButton = form.querySelector('.btn-login');
     showButtonLoading(submitButton);
     
-    // Simulate login process
+    // Authenticate user
     setTimeout(() => {
-        // Here you would typically make an API call to authenticate the user
-        console.log('Login attempt:', { email, password: '***' });
-        
-        // For demo purposes, redirect to main dashboard
-        // In a real app, you would validate credentials with a backend
-        localStorage.setItem('isLoggedIn', 'true');
-        localStorage.setItem('userEmail', email);
-        window.location.href = 'index.html';
-        
-        hideButtonLoading(submitButton);
+        try {
+            const user = window.UserDB.authenticateUser(email, password);
+            
+            // Set session data
+            const session = {
+                isLoggedIn: true,
+                userId: user.id,
+                email: user.email,
+                firstName: user.firstName,
+                lastName: user.lastName,
+                role: user.role,
+                loginTime: new Date().toISOString()
+            };
+            
+            localStorage.setItem('userSession', JSON.stringify(session));
+            localStorage.setItem('isLoggedIn', 'true');
+            localStorage.setItem('userEmail', user.email);
+            
+            // Redirect based on role
+            if (user.role === 'admin') {
+                window.location.href = 'admin-dashboard.html';
+            } else {
+                window.location.href = 'index.html';
+            }
+            
+        } catch (error) {
+            hideButtonLoading(submitButton);
+            showFieldError(form.querySelector('#email'), error.message);
+        }
     }, 1500);
 }
 
 function handleSignupSubmit(event) {
     event.preventDefault();
     
     const form = event.target;
     const formData = new FormData(form);
     
     // Validate all fields
     let isValid = true;
     const fields = form.querySelectorAll('input[required]');
     
     fields.forEach(field => {
         if (!validateField(field)) {
             isValid = false;
         }
     });
     
     // Additional validation for password match
     if (!validatePasswordMatch()) {
         isValid = false;
     }
     
     if (!isValid) {
         return;
     }
     
     // Show loading state
     const submitButton = form.querySelector('.btn-login');
     showButtonLoading(submitButton);
     
-    // Simulate signup process
+    // Create user account
     setTimeout(() => {
-        // Here you would typically make an API call to register the user
-        const userData = {
-            firstName: formData.get('firstName'),
-            lastName: formData.get('lastName'),
-            email: formData.get('email'),
-            terms: formData.get('terms'),
-            newsletter: formData.get('newsletter')
-        };
-        
-        console.log('Signup attempt:', userData);
-        
-        // For demo purposes, store user data and redirect to main dashboard
-        // In a real app, you would send this to a backend for registration
-        localStorage.setItem('isLoggedIn', 'true');
-        localStorage.setItem('userEmail', userData.email);
-        localStorage.setItem('userName', `${userData.firstName} ${userData.lastName}`);
-        window.location.href = 'index.html';
-        
-        hideButtonLoading(submitButton);
+        try {
+            const userData = {
+                firstName: formData.get('firstName'),
+                lastName: formData.get('lastName'),
+                email: formData.get('email'),
+                password: formData.get('password'),
+                terms: formData.get('terms'),
+                newsletter: formData.get('newsletter')
+            };
+            
+            const newUser = window.UserDB.createUser(userData);
+            
+            hideButtonLoading(submitButton);
+            
+            // Show success message and redirect to login
+            alert('Account created successfully! Your account is pending approval. You will be able to login once an admin approves your account.');
+            window.location.href = 'login.html';
+            
+        } catch (error) {
+            hideButtonLoading(submitButton);
+            showFieldError(form.querySelector('#email'), error.message);
+        }
     }, 2000);
 }