/* ==========================================================================
           JS: Theme Management
           ========================================================================== */
        const themeBtn = document.getElementById('theme-btn');
        const htmlElement = document.documentElement;

        // Initialize theme
        const savedTheme = localStorage.getItem('fp-theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        themeBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️';

        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('fp-theme', newTheme);
            themeBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
        });

        /* ==========================================================================
           JS: Minimal Router (Hash-based)
           ========================================================================== */
        const mainViews = document.querySelectorAll('#app-root > .page-view');
        const dashSubViews = document.querySelectorAll('.dash-sub-view');
        
        function handleRouting() {
            let hash = window.location.hash || '#home';
            
            // 1. Hide all main views
            mainViews.forEach(view => view.classList.remove('active'));

            // 2. Handle Dashboard & Nested Routes
            if (hash.startsWith('#dashboard')) {
                document.getElementById('page-dashboard').classList.add('active');
                
                // Reset sub-views
                dashSubViews.forEach(view => view.classList.remove('active'));
                
                // Determine target sub-view (default to home if just #dashboard)
                const subViewId = hash === '#dashboard' ? 'view-dashboard-home' : 'view-' + hash.substring(1);
                const targetSub = document.getElementById(subViewId);
                
                if (targetSub) {
                    targetSub.classList.add('active');
                } else {
                    document.getElementById('view-dashboard-home').classList.add('active');
                }

                // Update active link styling in sidebar
                document.querySelectorAll('.dash-link').forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === hash) link.classList.add('active-link');
                });
            } 
            // 3. Handle Standard Routes (#home, #catalog, #register, #login)
            else {
                const targetPage = document.getElementById(`page-${hash.substring(1)}`);
                if (targetPage) {
                    targetPage.classList.add('active');
                } else {
                    document.getElementById('page-home').classList.add('active');
                    window.location.hash = '#home';
                }
            }
            window.scrollTo(0, 0);
        }

        window.addEventListener('hashchange', handleRouting);
        window.addEventListener('DOMContentLoaded', handleRouting);

        /* ==========================================================================
           JS: Dashboard Sidebar Toggle Logic
           ========================================================================== */
        const sidebar = document.getElementById('admin-sidebar');
        const sidebarToggleBtn = document.getElementById('sidebar-toggle');
        
        sidebarToggleBtn.addEventListener('click', () => {
            // Toggling the 'collapsed' class changes the negative margin via CSS
            sidebar.classList.toggle('collapsed');
        });

        /* ==========================================================================
           JS: Form Handling & Authentication Logic
           ========================================================================== */
        
        // Educational Register Intercept
        document.getElementById('form-register').addEventListener('submit', function(e) {
            e.preventDefault(); // Stop standard HTTP post
            alert('Registration form validated natively. Proceeding to login...');
            window.location.hash = '#login';
            this.reset();
        });

        // Specific Secure Login Logic
        document.getElementById('form-login').addEventListener('submit', function(e) {
            e.preventDefault();
            const user = document.getElementById('login-user').value;
            const pwd = document.getElementById('login-pwd').value;

            if (user === 'admin' && pwd === 'test@123') {
                alert('Authentication Successful! Welcome Admin.');
                window.location.hash = '#dashboard';
                this.reset();
            } else {
                alert('Access Denied: Invalid Username or Password.');
            }
        });

        /* ==========================================================================
           JS: Cart Logic (Minimal Array Manipulation)
           ========================================================================== */
        let cartState = [];
        const cartDialog = document.getElementById('cart-modal');
        const cartBtn = document.getElementById('cart-btn');
        const cartBadge = document.getElementById('cart-badge');
        const cartContainer = document.getElementById('cart-items-container');

        // Open native dialog
        cartBtn.addEventListener('click', () => cartDialog.showModal());

        // Event delegation for Add to Cart buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const id = e.target.getAttribute('data-id');
                const name = e.target.getAttribute('data-name');
                const price = parseFloat(e.target.getAttribute('data-price'));
                
                cartState.push({ id, name, price });
                updateCartUI();
                
                // Visual feedback
                const btn = e.target;
                const originalText = btn.textContent;
                btn.textContent = '✓ Added';
                btn.classList.replace('btn-primary', 'btn-accent');
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.classList.replace('btn-accent', 'btn-primary');
                }, 1000);
            }
        });

        function updateCartUI() {
            cartBadge.textContent = cartState.length;
            
            if (cartState.length === 0) {
                cartContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted);">Your cart is empty.</p>';
                return;
            }

            let html = '';
            let total = 0;
            
            cartState.forEach(item => {
                total += item.price;
                html += `
                    <div class="cart-item">
                        <span>${item.name}</span>
                        <span style="font-weight: 600; color: var(--secondary)">$${item.price.toFixed(2)}</span>
                    </div>
                `;
            });

            html += `
                <div style="margin-top: 15px; border-top: 2px solid var(--border); padding-top: 15px; display: flex; justify-content: space-between; font-weight: 700; font-size: 1.2rem;">
                    <span>Order Total:</span>
                    <span style="color: var(--primary)">$${total.toFixed(2)}</span>
                </div>
            `;
            cartContainer.innerHTML = html;
        }

        /* ==========================================================================
           JS: Educational In-Page Anchor Fix
           Prevents scroll links from breaking the hash-based router
           ========================================================================== */
        document.querySelectorAll('.in-page-link').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
