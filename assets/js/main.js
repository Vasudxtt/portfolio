
    document.addEventListener('DOMContentLoaded', function () {
      /* ════════════════════════════════════════
         STEP 1 — LOADER
      ════════════════════════════════════════ */
      var pct = 0;
      var lf = document.getElementById('lf');
      var lp = document.getElementById('lp');

      var li = setInterval(function () {
        pct += Math.random() * 10 + 3;
        if (pct >= 100) { pct = 100; clearInterval(li); setTimeout(boot, 350); }
        if (lf) lf.style.width = pct + '%';
        if (lp) lp.textContent = String(Math.floor(pct)).padStart(3, '0');
      }, 75);

      /* ════════════════════════════════════════
         STEP 2 — BOOT
      ════════════════════════════════════════ */
      function boot() {
        var loader = document.getElementById('loader');
        loader.style.transition = 'opacity .8s';
        loader.style.opacity = '0';
        setTimeout(function () { loader.style.display = 'none'; }, 800);

        // Show nav
        var nav = document.getElementById('nav');
        nav.style.transition = 'opacity .6s';
        nav.style.opacity = '1';

        // Animate hero words
        var w1 = document.getElementById('w1');
        var w2 = document.getElementById('w2');
        var heye = document.querySelector('.h-eye');
        var hdesc = document.querySelector('.h-desc');
        var hbtns = document.querySelector('.h-btns');
        setTimeout(function () {
          w1.style.transition = 'transform 1s cubic-bezier(.16,1,.3,1)';
          requestAnimationFrame(function () { w1.style.transform = 'translateY(0)'; });
        }, 200);
        setTimeout(function () {
          w2.style.transition = 'transform 1s cubic-bezier(.16,1,.3,1)';
          requestAnimationFrame(function () { w2.style.transform = 'translateY(0)'; });
        }, 340);
        setTimeout(function () {
          if (heye) { heye.style.transition = 'opacity .8s ease'; heye.style.opacity = '1'; }
        }, 600);
        setTimeout(function () {
          if (hdesc) {
            hdesc.style.transition = 'opacity .8s ease,transform .8s ease'; hdesc.style.transform = 'translateY(8px)'; hdesc.style.opacity = '0';
            requestAnimationFrame(function () { hdesc.style.opacity = '1'; hdesc.style.transform = 'translateY(0)'; });
          }
          if (hbtns) { hbtns.style.transition = 'opacity .8s ease'; hbtns.style.opacity = '1'; }
        }, 780);

        // Scroll hint
        setTimeout(function () {
          var sh = document.getElementById('shint');
          sh.style.transition = 'opacity .7s';
          sh.style.opacity = '1';
        }, 1200);

        // Init everything
        initHeroCanvas();
        initHeroScroll();
        initRocket();
        initReveal();
        initProgress();
        initCursor();
        initScrollWords();
        initGlobalKinetic();
        initProjectSpotlight();
        initKineticTypography();
        initMagneticButtons();
        initCardTilt();
        initCursorTrails();
        initProjectParticles();
        initProjProgress();
        initCardTilt();
        initMagneticButtons();
        initCursorTrails();
        // Pitch needs Three.js — poll until loaded
        (function waitThree() {
          if (typeof THREE !== 'undefined') { initPitch(); }
          else { setTimeout(waitThree, 80); }
        })();
      }

      /* ════════════════════════════════════════
         HERO CANVAS — 2D particles (no Three.js)
      ════════════════════════════════════════ */
      function initHeroCanvas() {
        var c = document.getElementById('hc');
        var ctx = c.getContext('2d');
        var W, H, pts;
        function resize() {
          W = c.width = window.innerWidth;
          H = c.height = window.innerHeight;
          pts = Array.from({ length: 70 }, function () {
            return { x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .22, vy: (Math.random() - .5) * .22, r: Math.random() * 1.3 + .4 };
          });
        }
        resize();
        window.addEventListener('resize', resize);
        function draw() {
          requestAnimationFrame(draw);
          ctx.clearRect(0, 0, W, H);
          for (var i = 0; i < pts.length; i++) {
            var p = pts[i];
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(124,109,250,.25)'; ctx.fill();
            for (var j = i + 1; j < pts.length; j++) {
              var q = pts[j];
              var dx = p.x - q.x, dy = p.y - q.y, d = Math.sqrt(dx * dx + dy * dy);
              if (d < 110) {
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = 'rgba(56,189,248,' + (0.06 * (1 - d / 110)) + ')';
                ctx.lineWidth = .5; ctx.stroke();
              }
            }
          }
        }
        draw();
      }

      /* ════════════════════════════════════════
         HERO SCROLL — GTA6 zoom + stats
      ════════════════════════════════════════ */
      function initHeroScroll() {
        var hero = document.getElementById('hero');
        var zoom = document.getElementById('zoom');
        var hcnt = document.getElementById('hcnt');
        var hstats = document.getElementById('hstats');
        var shint = document.getElementById('shint');

        // Set initial states
        hstats.style.transform = 'translateY(100%)';
        zoom.style.transformOrigin = 'center center';

        window.addEventListener('scroll', function () {
          var heroH = hero.offsetHeight;
          var scrolled = window.scrollY;
          var progress = Math.min(1, scrolled / heroH);

          // GTA6: zoom name (0 → 55% scroll)
          var zp = Math.min(1, progress / 0.55);
          var scale = 1 + zp * 17;
          var alpha = Math.max(0, 1 - zp * 1.2);
          zoom.style.transform = 'scale(' + scale + ')';
          zoom.style.opacity = alpha;

          // Fade out front content (0 → 22%)
          var fp = Math.min(1, progress / 0.22);
          hcnt.style.opacity = Math.max(0, 1 - fp * 1.3);
          hcnt.style.transform = 'translateY(' + (-fp * 40) + 'px)';
          shint.style.opacity = Math.max(0, 1 - fp * 2);

          // Stats strip slide up (18% → 38%)
          var sp = Math.max(0, Math.min(1, (progress - 0.18) / 0.20));
          hstats.style.transform = 'translateY(' + ((1 - sp) * 100) + '%)';
        }, { passive: true });
      }

      /* ════════════════════════════════════════
         ROCKET CRASH — pure Canvas 2D
      ════════════════════════════════════════ */
      function initRocket() {
        var sec = document.getElementById('rocket');
        var c = document.getElementById('rc');
        var ctx = c.getContext('2d');
        var ctxt = document.getElementById('ctxt');
        var W, H;

        function resize() {
          W = c.width = sec.offsetWidth;
          H = c.height = sec.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        var active = false;
        var t = 0;
        var particles = [];
        var rings = [];
        var crashed = false;
        var textShown = false;

        // Stars
        var stars = [];
        for (var i = 0; i < 250; i++) {
          stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + .3 });
        }

        new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            // Reset on re-entry
            t = 0; particles = []; rings = []; crashed = false; textShown = false;
            ctxt.style.opacity = '0';
            active = true;
            loop();
          } else {
            active = false;
          }
        }, { threshold: 0.01 }).observe(sec);

        function drawRocket(x, y, alpha, angle) {
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.translate(x, y);
          if (angle) ctx.rotate(angle);
          // Body
          ctx.fillStyle = '#eef2ff';
          ctx.beginPath(); ctx.moveTo(0, -28); ctx.lineTo(9, 8); ctx.lineTo(-9, 8); ctx.closePath(); ctx.fill();
          // Window
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath(); ctx.arc(0, -7, 4, 0, Math.PI * 2); ctx.fill();
          // Fins
          ctx.fillStyle = '#7c6dfa';
          ctx.beginPath(); ctx.moveTo(9, 3); ctx.lineTo(16, 12); ctx.lineTo(9, 8); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(-9, 3); ctx.lineTo(-16, 12); ctx.lineTo(-9, 8); ctx.closePath(); ctx.fill();
          // Flame
          ctx.globalAlpha = alpha * (.6 + Math.random() * .4);
          var g = ctx.createLinearGradient(0, 8, 0, 34);
          g.addColorStop(0, '#c084fc'); g.addColorStop(.5, '#38bdf8'); g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.moveTo(-5, 8); ctx.lineTo(0, 32 + Math.random() * 8); ctx.lineTo(5, 8); ctx.closePath(); ctx.fill();
          ctx.restore();
        }

        function loop() {
          if (!active) return;
          requestAnimationFrame(loop);
          t += 0.022; // faster tick

          // Background
          var earthProgress = Math.min(1, Math.max(0, (t - 0.6) / 1.2));
          ctx.clearRect(0, 0, W, H);

          // Sky gradient
          var sky = ctx.createLinearGradient(0, 0, 0, H);
          sky.addColorStop(0, 'rgba(5,8,20,1)');
          sky.addColorStop(1, 'rgba(8,18,45,' + (.3 + earthProgress * .7) + ')');
          ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

          // Stars
          var sa = Math.max(0, 1 - earthProgress * 1.6);
          stars.forEach(function (s) {
            ctx.globalAlpha = sa * .6;
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2); ctx.fill();
          });
          ctx.globalAlpha = 1;

          // Earth
          var ey = H + 60 - earthProgress * (H * 0.6);
          ctx.save();
          ctx.beginPath(); ctx.arc(W / 2, ey, W * .5, 0, Math.PI * 2);
          var eg = ctx.createRadialGradient(W / 2, ey - W * .08, W * .08, W / 2, ey, W * .5);
          eg.addColorStop(0, 'rgba(28,88,48,.9)'); eg.addColorStop(.4, 'rgba(18,56,120,.8)'); eg.addColorStop(1, 'rgba(8,18,50,.95)');
          ctx.fillStyle = eg; ctx.fill();
          // Atmosphere glow
          var ag = ctx.createRadialGradient(W / 2, ey, W * .48, W / 2, ey, W * .58);
          ag.addColorStop(0, 'rgba(56,189,248,0)'); ag.addColorStop(.7, 'rgba(56,189,248,.18)'); ag.addColorStop(1, 'rgba(56,189,248,0)');
          ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(W / 2, ey, W * .58, 0, Math.PI * 2); ctx.fill();
          ctx.restore();

          var cx = W / 2;
          var ry;

          if (!crashed) {
            if (t < 0.7) {
              // LAUNCH UP — starts immediately
              ry = H * 1.1 - (t / 0.7) * H * 1.6;
              if (Math.random() > .35) particles.push({ x: cx + (Math.random() - .5) * 6, y: ry + 22, vx: (Math.random() - .5) * 1.5, vy: -1.5 - Math.random() * 2, r: 3 + Math.random() * 5, life: 1, col: Math.random() > .5 ? '#7c6dfa' : '#38bdf8' });
              drawRocket(cx + (Math.random() - .5) * 2, ry, Math.min(1, t * 6), 0);

            } else if (t < 1.3) {
              // SHORT DRIFT IN SPACE
              ry = -50 + Math.sin((t - 0.7) * Math.PI * .5) * 15;
              drawRocket(cx + Math.sin(t * 2) * 5, ry, 1, 0);

            } else if (t < 2.2) {
              // PLUMMET — rotate as it falls
              var ct2 = (t - 1.3) / 0.9;
              var e = ct2 * ct2 * ct2;
              ry = -50 + e * (H * .52 + 80);
              var tilt = ct2 * 0.35; // slight tilt on way down
              if (Math.random() > .2) particles.push({ x: cx + (Math.random() - .5) * 4, y: ry + 18, vx: (Math.random() - .5) * 2, vy: -3 - Math.random() * 2, r: 4 + Math.random() * 6, life: 1, col: Math.random() > .5 ? '#c084fc' : '#38bdf8' });
              drawRocket(cx + (Math.random() - .5) * (3 + ct2 * 10), ry + (Math.random() - .5) * (2 + ct2 * 5), 1, tilt);

            } else {
              // IMPACT
              crashed = true;
              var ix = cx, iy = H * .48;
              for (var ii = 0; ii < 80; ii++) {
                var ang = Math.random() * Math.PI * 2, spd = 2 + Math.random() * 10;
                particles.push({ x: ix, y: iy, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 6, r: 2 + Math.random() * 5, life: 1, col: ['#7c6dfa', '#38bdf8', '#c084fc', '#2dd4bf'][Math.floor(Math.random() * 4)] });
              }
              rings.push({ r: 0, life: 1, maxR: Math.min(W, H) * .35 });
              rings.push({ r: 0, life: 1, maxR: Math.min(W, H) * .22 });
              rings.push({ r: 0, life: .7, maxR: Math.min(W, H) * .5 });
              if (!textShown) {
                textShown = true;
                setTimeout(function () {
                  ctxt.style.transition = 'opacity .7s';
                  ctxt.style.opacity = '1';
                  // Start cursor trail on rocket section
                  initRocketCursor(sec);
                }, 300);
              }
            }
          }

          // Particles
          particles = particles.filter(function (p) { return p.life > 0.02; });
          particles.forEach(function (p) {
            p.x += p.vx; p.y += p.vy; p.vy += .14; p.life -= .018; p.r *= .97;
            ctx.globalAlpha = p.life * .75;
            ctx.fillStyle = p.col;
            ctx.beginPath(); ctx.arc(p.x, p.y, Math.max(0, p.r), 0, Math.PI * 2); ctx.fill();
          });
          ctx.globalAlpha = 1;

          // Impact rings
          rings = rings.filter(function (r) { return r.life > 0; });
          rings.forEach(function (r) {
            r.r += r.maxR * .04; r.life -= .018;
            ctx.save(); ctx.globalAlpha = r.life * .45;
            ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(W / 2, H * .48, r.r, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
          });
        }
      }

      /* ════════════════════════════════════════
         TECH ARSENAL — 3D FIFA-STYLE PITCH (Three.js)
      ════════════════════════════════════════ */
      function initPitch() {
        var sec = document.getElementById('arsenal');
        var canvas = document.getElementById('pc');
        if (typeof THREE === 'undefined') { console.warn('THREE not loaded'); return; }

        var renderer, scene, camera, active = false;
        var ballMesh, trailGeo, trailPos, trailHist = [];
        var nodeMeshes = [], bt = 0, curve;
        var mx = 0, my = 0;

        try {
          renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
          renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
          renderer.shadowMap.enabled = false;

          scene = new THREE.Scene();

          /* ── CAMERA: low angle, perspective like FIFA ── */
          camera = new THREE.PerspectiveCamera(55, 1, 0.1, 500);
          camera.position.set(0, 18, 26);
          camera.lookAt(0, 0, -2);

          function resize() {
            var W = canvas.clientWidth, H = canvas.clientHeight;
            if (W > 0 && H > 0) {
              renderer.setSize(W, H, false); /* false = don't override CSS size */
              camera.aspect = W / H;
              var mob = window.innerWidth <= 480;
              var tab = window.innerWidth <= 900;
              camera.fov = mob ? 64 : tab ? 60 : 55;
              camera.position.set(0, mob ? 14 : tab ? 16 : 18, mob ? 20 : tab ? 23 : 26);
              camera.lookAt(0, 0, -2);
              camera.updateProjectionMatrix();
            }
          }
          resize();

          /* ── PITCH GRASS (alternating stripes) ── */
          // Base dark green
          var pitchMat = new THREE.MeshBasicMaterial({ color: 0x021a07 });
          var pitchGeo = new THREE.PlaneGeometry(28, 18);
          var pitchBase = new THREE.Mesh(pitchGeo, pitchMat);
          pitchBase.rotation.set(-Math.PI / 2, 0, 0);
          scene.add(pitchBase);

          // Alternating lighter stripes
          var stripeCols = [0x021a07, 0x031f08];
          for (var si = 0; si < 7; si++) {
            var stripe = new THREE.Mesh(
              new THREE.PlaneGeometry(4, 18),
              new THREE.MeshBasicMaterial({ color: stripeCols[si % 2] })
            );
            stripe.rotation.set(-Math.PI / 2, 0, 0);
            stripe.position.set(-12 + si * 4, 0.001, 0);
            scene.add(stripe);
          }

          /* ── PITCH LINES ── */
          var LM = new THREE.LineBasicMaterial({ color: 0xd4b84a, transparent: true, opacity: 0.55 });
          function ln(pts) {
            var g = new THREE.BufferGeometry().setFromPoints(
              pts.map(function (p) { return new THREE.Vector3(p[0], 0.02, p[1]); })
            );
            scene.add(new THREE.Line(g, LM));
          }
          // Outline
          ln([[-13, -8.5], [13, -8.5], [13, 8.5], [-13, 8.5], [-13, -8.5]]);
          // Halfway
          ln([[0, -8.5], [0, 8.5]]);
          // Centre circle
          var cc = []; for (var a = 0; a <= Math.PI * 2; a += 0.07) cc.push([Math.cos(a) * 2.8, Math.sin(a) * 2.8]); ln(cc);
          // Penalty boxes
          ln([[-13, -4], [-9, -4], [-9, 4], [-13, 4]]);
          ln([[13, -4], [9, -4], [9, 4], [13, 4]]);
          // 6-yard boxes
          ln([[-13, -2], [-11, -2], [-11, 2], [-13, 2]]);
          ln([[13, -2], [11, -2], [11, 2], [13, 2]]);
          // Goals
          ln([[-13, -1.2], [-14.2, -1.2], [-14.2, 1.2], [-13, 1.2]]);
          ln([[13, -1.2], [14.2, -1.2], [14.2, 1.2], [13, 1.2]]);
          // Centre spot
          var cdot = new THREE.Mesh(
            new THREE.CircleGeometry(0.18, 12),
            new THREE.MeshBasicMaterial({ color: 0xd4b84a })
          );
          cdot.rotation.set(-Math.PI / 2, 0, 0); cdot.position.y = 0.02;
          scene.add(cdot);
          // Penalty spots
          var ps1 = cdot.clone(); ps1.position.set(-10.5, 0.02, 0); scene.add(ps1);
          var ps2 = cdot.clone(); ps2.position.set(10.5, 0.02, 0); scene.add(ps2);

          /* ── SKILL NODES — placed on pitch like real players ── */
          var SKILLS = [
            { label: 'REACT.JS', cat: 'FRONTEND', col: 0x7c6dfa, p: [-5, 0, -3] },
            { label: 'NODE.JS', cat: 'BACKEND', col: 0x38bdf8, p: [5, 0, -3] },
            { label: 'MONGODB', cat: 'DATABASE', col: 0x2dd4bf, p: [-9, 0, 0] },
            { label: 'EXPRESS.JS', cat: 'FRAMEWORK', col: 0xc084fc, p: [0, 0, 0] },
            { label: 'WORDPRESS', cat: 'CMS', col: 0x38bdf8, p: [9, 0, 0] },
            { label: 'PHP', cat: 'SERVER', col: 0x7c6dfa, p: [-4, 0, 4] },
            { label: 'MYSQL', cat: 'DATABASE', col: 0x2dd4bf, p: [4, 0, 4] },
            { label: 'NEXT.JS', cat: 'FULL STACK', col: 0xc084fc, p: [0, 0, -6] },
            { label: 'TYPESCRIPT', cat: 'LANGUAGE', col: 0x38bdf8, p: [0, 0, 7] },
            { label: 'JAVASCRIPT', cat: 'LANGUAGE', col: 0x7c6dfa, p: [-6, 0, 0] },
            { label: 'GIT / GITHUB', cat: 'VERSION CONTROL', col: 0xf97316, p: [6, 0, 0] },
            { label: 'MYSQL', cat: 'DATABASE', col: 0x2dd4bf, p: [3, 0, -5] },
          ];

          // Remove duplicate — keep unique 11 positions
          var POSITIONS = [
            { label: 'REACT.JS',    cat: 'FRONTEND',        col: 0x7c6dfa, p: [-5,  0, -3.5] },
            { label: 'NODE.JS',     cat: 'BACKEND',         col: 0x38bdf8, p: [ 5,  0, -3.5] },
            { label: 'NEXT.JS',     cat: 'FULL STACK',      col: 0xc084fc, p: [ 0,  0, -6  ] },
            { label: 'MONGODB',     cat: 'DATABASE',        col: 0x2dd4bf, p: [-9,  0,  0.5] },
            { label: 'EXPRESS.JS',  cat: 'FRAMEWORK',       col: 0xc084fc, p: [ 0,  0,  0  ] },
            { label: 'TYPESCRIPT',  cat: 'LANGUAGE',        col: 0x38bdf8, p: [ 0,  0,  7  ] },
            { label: 'JAVASCRIPT',  cat: 'LANGUAGE',        col: 0xfbbf24, p: [-6,  0,  0  ] },
            { label: 'PYTHON',      cat: 'LANGUAGE',        col: 0x34d399, p: [ 6,  0,  0  ] },
            { label: 'PHP',         cat: 'SERVER',          col: 0x7c6dfa, p: [-4,  0,  4  ] },
            { label: 'MYSQL',       cat: 'DATABASE',        col: 0x2dd4bf, p: [ 4,  0,  4  ] },
            { label: 'WORDPRESS',   cat: 'CMS',             col: 0x38bdf8, p: [ 9,  0,  0.5] },
            { label: 'GIT / GITHUB',cat: 'VERSION CONTROL', col: 0xf97316, p: [ 6,  0, -4  ] },
            { label: 'HTML / CSS',  cat: 'MARKUP',          col: 0xfbbf24, p: [-7,  0, -5  ] },
            { label: 'REST API',    cat: 'INTEGRATION',     col: 0x4ade80, p: [ 7,  0, -5  ] },
            { label: 'FIREBASE',    cat: 'BACKEND',         col: 0xfb923c, p: [ 3,  0,  6.5] },
            { label: 'GROQ API',    cat: 'AI/LLM',          col: 0xa78bfa, p: [ 0,  0, -8  ] },
            { label: 'THREE.JS',    cat: '3D / WebGL',      col: 0xf472b6, p: [ 8,  0,  4  ] },
            { label: 'FRAMER',      cat: 'DESIGN/MOTION',   col: 0xec4899, p: [-8,  0,  4  ] },
            { label: 'TAILWIND',    cat: 'CSS FRAMEWORK',   col: 0x06b6d4, p: [-3,  0,  6.5] },
            { label: 'VERCEL',      cat: 'DEPLOY',          col: 0xe2e8f0, p: [-5,  0,  7  ] },
          ];

          POSITIONS.forEach(function (s) {
            // Glowing sphere on grass
            var sphere = new THREE.Mesh(
              new THREE.SphereGeometry(0.32, 14, 14),
              new THREE.MeshBasicMaterial({ color: s.col, transparent: true, opacity: 0.9 })
            );
            sphere.position.set(s.p[0], 0.32, s.p[2]);
            scene.add(sphere);

            // Pulse ring on ground
            var ring = new THREE.Mesh(
              new THREE.TorusGeometry(0.55, 0.04, 8, 24),
              new THREE.MeshBasicMaterial({ color: s.col, transparent: true, opacity: 0.3 })
            );
            ring.rotation.set(-Math.PI / 2, 0, 0);
            ring.position.set(s.p[0], 0.02, s.p[2]);
            scene.add(ring);

            // Shadow circle on grass
            var shadow = new THREE.Mesh(
              new THREE.CircleGeometry(0.35, 16),
              new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.35 })
            );
            shadow.rotation.set(-Math.PI / 2, 0, 0);
            shadow.position.set(s.p[0], 0.01, s.p[2]);
            scene.add(shadow);

            nodeMeshes.push({ mesh: sphere, ring: ring, col: s.col, label: s.label, cat: s.cat, p: s.p, pulse: Math.random() * Math.PI * 2 });
          });

          /* ── BALL ── */
          ballMesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.3, 1),
            new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.92 })
          );
          scene.add(ballMesh);

          // Ball path through all nodes
          var pathPts = POSITIONS.map(function (s) { return new THREE.Vector3(s.p[0], 0.55, s.p[2]); });
          pathPts.push(pathPts[0].clone());
          curve = new THREE.CatmullRomCurve3(pathPts, true);

          // Trail
          trailGeo = new THREE.BufferGeometry();
          trailPos = new Float32Array(18 * 3);
          trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
          scene.add(new THREE.Points(trailGeo, new THREE.PointsMaterial({
            color: 0xd4b84a, size: 0.1, transparent: true, opacity: 0.5
          })));

          /* ── HTML LABELS (absolutely positioned over canvas) ── */
          // Remove old .sf elements
          sec.querySelectorAll('.sf').forEach(function (el) { el.remove(); });

          var labelEls = POSITIONS.map(function (s) {
            var div = document.createElement('div');
            // Sizing handled by CSS media queries via pitch-label-* classes
            div.style.cssText = 'position:absolute;z-index:30;pointer-events:all;cursor:pointer;opacity:0;transition:opacity .4s;text-align:center;transform:translate(-50%,-100%)';
            div.addEventListener('click', function(e) {
              e.stopPropagation();
              if (window.showTechPopup) window.showTechPopup(s.label, e.clientX, e.clientY);
            });
            div.addEventListener('mouseenter', function() { div.style.transform = 'translate(-50%,-110%) scale(1.05)'; });
            div.addEventListener('mouseleave', function() { div.style.transform = 'translate(-50%,-100%) scale(1)'; });
            div.innerHTML =
              '<div style="background:rgba(2,5,15,.97);border:1px solid rgba(212,184,74,.85);border-top:2px solid #d4b84a;padding:6px 14px 5px;white-space:nowrap;box-shadow:0 0 24px rgba(212,184,74,.25),0 4px 20px rgba(0,0,0,.8)">' +
              '<div style="font-family:\'Bebas Neue\',\'Arial Black\',Impact,sans-serif;font-size:14px;color:#fbbf24;letter-spacing:.1em;line-height:1;text-shadow:0 0 12px rgba(212,184,74,.6)">' + s.label + '</div>' +
              '<div style="font-family:\'Share Tech Mono\',\'Courier New\',monospace;font-size:7px;letter-spacing:.22em;text-transform:uppercase;color:rgba(56,189,248,.9);margin-top:3px;">' + s.cat + '</div>' +
              '</div>';
            sec.appendChild(div);
            return div;
          });

          /* ── PROJECT 3D coords to 2D screen ── */
          var tmpV = new THREE.Vector3();
          function toScreen(x, y, z) {
            tmpV.set(x, y, z);
            tmpV.project(camera);
            var W2 = canvas.clientWidth, H2 = canvas.clientHeight;
            return {
              x: (tmpV.x * 0.5 + 0.5) * W2,
              y: (-tmpV.y * 0.5 + 0.5) * H2,
              vis: tmpV.z < 1
            };
          }

          /* ── MOUSE / TOUCH influence ── */
          document.addEventListener('mousemove', function (e) {
            mx = (e.clientX / window.innerWidth - 0.5);
            my = (e.clientY / window.innerHeight - 0.5);
          });
          window.addEventListener('touchmove', function (e) {
            if (e.touches.length) {
              mx = (e.touches[0].clientX / window.innerWidth - 0.5);
              my = (e.touches[0].clientY / window.innerHeight - 0.5);
            }
          }, { passive: true });

          /* ── IntersectionObserver ── */
          new IntersectionObserver(function (entries) {
            active = entries[0].isIntersecting;
            if (active) {
              // Show labels
              labelEls.forEach(function (el, i) {
                setTimeout(function () { el.style.opacity = '1'; }, i * 100);
              });
              // Pulse pills
              sec.querySelectorAll('.spill').forEach(function (p, i) {
                setTimeout(function () {
                  p.style.borderColor = 'rgba(212,184,74,.7)';
                  p.style.color = '#d4b84a';
                  p.style.boxShadow = '0 0 12px rgba(212,184,74,.3)';
                  setTimeout(function () { p.style.borderColor = ''; p.style.color = ''; p.style.boxShadow = ''; }, 700);
                }, i * 60);
              });
              loop();
            } else {
              labelEls.forEach(function (el) { el.style.opacity = '0'; });
            }
          }, { threshold: 0.05 }).observe(sec);

          /* ── RENDER LOOP ── */
          function loop() {
            if (!active) return;
            requestAnimationFrame(loop);
            var t = Date.now() * 0.001;

            // Ball move
            bt = (bt + 0.0014) % 1;
            var bp = curve.getPoint(bt);
            ballMesh.position.copy(bp);
            ballMesh.rotation.y += 0.06;
            ballMesh.rotation.x += 0.04;

            // Trail
            trailHist.push(bp.clone());
            if (trailHist.length > 12) trailHist.shift();
            trailHist.forEach(function (p, i) { trailPos[i * 3] = p.x; trailPos[i * 3 + 1] = p.y; trailPos[i * 3 + 2] = p.z; });
            trailGeo.attributes.position.needsUpdate = true;

            // Node pulse
            nodeMeshes.forEach(function (n, i) {
              n.pulse += 0.03;
              var s = 1 + Math.sin(n.pulse) * 0.07;
              n.mesh.scale.set(s, s, s);
              // Light up near ball
              var dx = n.p[0] - bp.x, dz = n.p[2] - bp.z;
              var dist = Math.sqrt(dx * dx + dz * dz);
              n.mesh.material.opacity = dist < 1.5 ? 1.0 : 0.88;
            });

            // Camera gentle sway (reduced on mobile)
            var swayScale = window.innerWidth <= 900 ? 1 : 3;
            var baseY = window.innerWidth <= 480 ? 14 : window.innerWidth <= 900 ? 16 : 18;
            camera.position.x = mx * swayScale;
            camera.position.y = baseY - my * (swayScale * 0.67);
            camera.lookAt(0, 0, -2);

            renderer.render(scene, camera);

            // Update HTML label positions
            POSITIONS.forEach(function (s, i) {
              var screen = toScreen(s.p[0], 0.9, s.p[2]);
              if (screen.vis) {
                labelEls[i].style.left = screen.x + 'px';
                labelEls[i].style.top = screen.y + 'px';
              }
            });
          }

          window.addEventListener('resize', resize);
          window.addEventListener('orientationchange', function () { setTimeout(resize, 250); });

        } catch (e) {
          console.warn('Pitch error:', e);
        }
      }

      /* ════════════════════════════════════════
         ROCKET SECTION — Cursor Trail Magic
      ════════════════════════════════════════ */
      function initRocketCursor(sec) {
        var dot = document.getElementById('crash-cursor');
        if (!dot) return;
        var trails = [];
        var TRAIL_COUNT = 8;
        // Create trail rings
        for (var i = 0; i < TRAIL_COUNT; i++) {
          var el = document.createElement('div');
          el.className = 'crash-ring';
          var size = (6 + i * 7) + 'px';
          el.style.cssText = 'position:absolute;z-index:19;pointer-events:none;border-radius:50%;border:1px solid rgba(56,189,248,' + (0.35 - i * .04) + ');transform:translate(-50%,-50%);opacity:0;width:' + size + ';height:' + size;
          sec.appendChild(el);
          trails.push({ el: el, x: 0, y: 0, delay: i * 0.12 });
        }

        var mx = window.innerWidth / 2, my = window.innerHeight / 2;
        var history = [];

        sec.addEventListener('mousemove', function (e) {
          var r = sec.getBoundingClientRect();
          mx = e.clientX - r.left;
          my = e.clientY - r.top;
          dot.style.opacity = '1';
          dot.style.left = mx + 'px';
          dot.style.top = my + 'px';
          trails.forEach(function (t) { t.el.style.opacity = '1'; });
          history.push({ x: mx, y: my, t: Date.now() });
          if (history.length > 60) history.shift();
        });

        sec.addEventListener('mouseleave', function () {
          dot.style.opacity = '0';
          trails.forEach(function (t) { t.el.style.opacity = '0'; });
        });

        (function animTrail() {
          requestAnimationFrame(animTrail);
          var now = Date.now();
          trails.forEach(function (tr, i) {
            var targetTime = now - (i + 1) * 60;
            var point = null;
            for (var h = history.length - 1; h >= 0; h--) {
              if (history[h].t <= targetTime) { point = history[h]; break; }
            }
            if (!point && history.length) point = history[0];
            if (point) {
              tr.el.style.left = point.x + 'px';
              tr.el.style.top = point.y + 'px';
            }
          });
        })();
      }

      /* ════════════════════════════════════════
         SCROLL REVEAL — IntersectionObserver
      ════════════════════════════════════════ */
      function initReveal() {
        // General reveals with better easing
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('vis');
              io.unobserve(e.target);
            }
          });
        }, { threshold: .08 });
        document.querySelectorAll('.sr,.sl').forEach(function (el) { io.observe(el); });

        // Zoom-reveal elements
        var ioZ = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('vis'); ioZ.unobserve(e.target); }
          });
        }, { threshold: .1 });
        document.querySelectorAll('.zoom-reveal').forEach(function (el) { ioZ.observe(el); });

        // Attr bars
        new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) return;
          document.querySelectorAll('.ar-fill').forEach(function (el, i) {
            setTimeout(function () {
              el.style.transition = 'width 1.4s cubic-bezier(.16,1,.3,1)';
              el.style.width = el.dataset.w + '%';
            }, i * 100);
          });
        }, { threshold: .2 }).observe(document.querySelector('.attrs'));

        // Project cards stagger
        new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) return;
          document.querySelectorAll('.pc2').forEach(function (c, i) {
            c.style.opacity = '0'; c.style.transform = 'translateY(32px) scale(.97)';
            setTimeout(function () {
              c.style.transition = 'opacity .7s ease,transform .7s cubic-bezier(.16,1,.3,1)';
              c.style.opacity = '1'; c.style.transform = 'translateY(0) scale(1)';
            }, i * 90);
          });
        }, { threshold: .06 }).observe(document.getElementById('carousel-track') || document.getElementById('projects'));

        // Exp bullets
        var epl = document.getElementById('epl');
        if (epl) new IntersectionObserver(function (entries) {
          if (!entries[0].isIntersecting) return;
          document.querySelectorAll('.ep').forEach(function (el, i) {
            el.style.opacity = '0'; el.style.transform = 'translateX(-24px)';
            setTimeout(function () {
              el.style.transition = 'opacity .6s ease,transform .6s cubic-bezier(.16,1,.3,1)';
              el.style.opacity = '1'; el.style.transform = 'translateX(0)';
            }, i * 80);
          });
        }, { threshold: .1 }).observe(epl);

        // ── Football bounce animation on each project card ──
        document.querySelectorAll('.pc2').forEach(function(card) {
          var ball = card.querySelector('.pc2-football');
          if (!ball) return;
          var x = parseFloat(ball.style.left) || 65;
          var y = parseFloat(ball.style.top)  || 50;
          var vx = (Math.random() - .5) * .4;
          var vy = (Math.random() - .5) * .4;
          var animId = null;
          var W = 100, H = 100;

          function animate() {
            x += vx; y += vy;
            if (x <= 5 || x >= 95)  { vx *= -1; x = Math.max(5, Math.min(95, x)); }
            if (y <= 10 || y >= 90) { vy *= -1; y = Math.max(10, Math.min(90, y)); }
            ball.style.left = x + '%';
            ball.style.top  = y + '%';
            animId = requestAnimationFrame(animate);
          }

          card.addEventListener('mouseenter', function() {
            if (!animId) animate();
          });
          card.addEventListener('mouseleave', function() {
            if (animId) { cancelAnimationFrame(animId); animId = null; }
          });
        });

        // ── Scroll parallax for sections ──
        var sections = document.querySelectorAll('#intro-quote, #about, #exp, #contact');
        window.addEventListener('scroll', function() {
          var sy = window.scrollY;
          sections.forEach(function(sec) {
            var rect = sec.getBoundingClientRect();
            var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            if (progress > 0 && progress < 1) {
              var shift = (progress - .5) * 40;
              var inner = sec.querySelector('.iq-inner, .sr, .exp-grid');
              if (inner) inner.style.transform = 'translateY(' + shift + 'px)';
            }
          });
        }, { passive: true });

        // ── Section zoom on scroll (about + exp) ──
        var zoomSections = document.querySelectorAll('#about, #exp, #contact');
        var zsIO = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            var el = e.target;
            if (e.isIntersecting) {
              el.style.transition = 'transform 1.2s cubic-bezier(.16,1,.3,1), opacity 1.2s ease';
              el.style.opacity = '1';
              el.style.transform = 'scale(1)';
            }
          });
        }, { threshold: .05 });
        zoomSections.forEach(function(s) {
          s.style.opacity = '0';
          s.style.transform = 'scale(.97)';
          zsIO.observe(s);
        });

        // ── Horizontal scroll tilt on carousel cards ──
        document.querySelectorAll('.pc2').forEach(function(card) {
          card.addEventListener('mousemove', function(e) {
            var r = card.getBoundingClientRect();
            var cx = (e.clientX - r.left) / r.width  - .5;
            var cy = (e.clientY - r.top)  / r.height - .5;
            card.style.transform = 'translateY(-6px) scale(1.012) rotateY(' + (cx * 6) + 'deg) rotateX(' + (-cy * 4) + 'deg)';
          });
          card.addEventListener('mouseleave', function() {
            card.style.transform = '';
          });
        });
      }

      /* ════════════════════════════════════════
         SCROLL PROGRESS
      ════════════════════════════════════════ */
      function initProgress() {
        window.addEventListener('scroll', function () {
          var p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
          document.getElementById('prog').style.width = (p * 100) + '%';
        }, { passive: true });
      }

      /* ════════════════════════════════════════
         CURSOR
      ════════════════════════════════════════ */

      /* ════════════════════════════════════════
         KINETIC TYPOGRAPHY ENGINE
      ════════════════════════════════════════ */

      /* ════════════════════════════════════════
         UNIVERSAL SCROLL-WORD SYSTEM
         — wraps all .sw-word in .sw-word-inner
         — splits .sw-para text into lines
         — observes .sw-block for scroll trigger
         — velocity-aware speed
      ════════════════════════════════════════ */
      function initScrollWords() {
        var lastScrollY = window.scrollY;
        var velocity = 0;
        var velSmooth = 0;

        // Track velocity
        window.addEventListener('scroll', function() {
          var dy = Math.abs(window.scrollY - lastScrollY);
          velSmooth += (dy - velSmooth) * 0.22;
          velocity = velSmooth;
          lastScrollY = window.scrollY;
        }, { passive: true });

        // ── Step A: wrap every .sw-word text into .sw-word-inner
        document.querySelectorAll('.sw-word').forEach(function(w) {
          // collect child nodes that are text / non-sw-under spans
          var children = Array.from(w.childNodes);
          var inner = document.createElement('span');
          inner.className = 'sw-word-inner';
          children.forEach(function(ch) {
            if (ch.classList && ch.classList.contains('sw-under')) return;
            inner.appendChild(ch.cloneNode(true));
          });
          // keep sw-under as is
          var under = w.querySelector('.sw-under');
          // clear and rebuild
          w.innerHTML = '';
          w.appendChild(inner);
          if (under) w.appendChild(under);
        });

               // ── Step B: sw-para → single wrapped line for clean reveal
        document.querySelectorAll('.sw-para').forEach(function(p) {
          if (p.querySelector('.sw-line')) return;
          // Single wrap so the whole para reveals at once (no broken splits)
          var html = p.innerHTML;
          p.innerHTML = '<span class="sw-line">' + html + '</span>';
        });

        // ── Step C: Observe .sw-block elements
        var io = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            var block = entry.target;
            var spd = Math.max(0.2, Math.min(3, 0.5 + velocity * 0.08));
            // Apply velocity-aware duration to all sw-word-inner children
            block.querySelectorAll('.sw-word-inner').forEach(function(inner, i) {
              var dur = (0.75 / spd).toFixed(2);
              var baseDelay = parseFloat(inner.closest('.sw-word').style.transitionDelay || 0);
              inner.style.transition = 'transform ' + dur + 's cubic-bezier(.16,1,.3,1) ' + (i * 0.04) + 's, opacity ' + (dur * 0.8) + 's ease ' + (i * 0.04) + 's';
            });
            block.querySelectorAll('.sw-line').forEach(function(line, i) {
              var dur = (0.8 / spd).toFixed(2);
              line.style.transition = 'transform ' + dur + 's cubic-bezier(.16,1,.3,1) ' + (i * 0.06 + 0.1) + 's, opacity ' + (dur * 0.7) + 's ease ' + (i * 0.06 + 0.1) + 's';
            });
            block.classList.add('kw-in');
            // Add kw-in to each individual sw-word inside the block
            block.querySelectorAll('.sw-word').forEach(function(w) {
              w.classList.add('kw-in');
              w.classList.remove('kw-out');
            });
            // Add kw-in to each sw-para
            block.querySelectorAll('.sw-para').forEach(function(p) {
              p.classList.add('kw-in');
            });
            io.unobserve(block);
          });
        }, { threshold: 0.12, rootMargin: '-40px 0px' });

        document.querySelectorAll('.sw-block').forEach(function(el) { io.observe(el); });

        // Also observe .sw-para paragraphs directly if not inside sw-block
        var ioP = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('sw-vis');
            ioP.unobserve(entry.target);
          });
        }, { threshold: 0.15 });
        document.querySelectorAll('.sw-para').forEach(function(el) {
          // Observe all sw-paras for visibility
          ioP.observe(el);
        });

        // Observe ep bullets
        var ioEp = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (!e.isIntersecting) return;
            var i = 0;
            e.target.querySelectorAll('.ep').forEach(function(ep) {
              (function(ep, delay) {
                setTimeout(function() { ep.classList.add('kw-in'); }, delay);
              })(ep, i++ * 80);
            });
            // Also trigger if this IS an ep
            if (e.target.classList.contains('ep')) e.target.classList.add('kw-in');
            ioEp.unobserve(e.target);
          });
        }, { threshold: 0.05 });
        document.querySelectorAll('.ep').forEach(function(el) { ioEp.observe(el); });
        var epl2 = document.getElementById('epl');
        if (epl2) ioEp.observe(epl2);
      }

      /* ════════════════════════════════════════
         PROJECT SPOTLIGHT SYSTEM
         — canvas follows mouse across carousel
         — dims inactive cards
         — on card hover: flash + spotlight cone
      ════════════════════════════════════════ */
      function initProjectSpotlight() {
        var canvas = document.getElementById('proj-spotlight');
        var projSec = document.getElementById('projects');
        if (!canvas || !projSec) return;
        var ctx = canvas.getContext('2d');
        var W=0, H=0, mx=-999, my=-999, lx=-999, ly=-999;
        var alpha=0, targetAlpha=0, activeCard=null, sweepT=0;

        function resize() {
          W = canvas.width  = projSec.offsetWidth;
          H = canvas.height = projSec.offsetHeight;
        }
        resize();
        try { new ResizeObserver(resize).observe(projSec); } catch(e){ window.addEventListener('resize',resize); }

        projSec.addEventListener('mousemove', function(e) {
          var r = projSec.getBoundingClientRect();
          mx = e.clientX - r.left;
          my = e.clientY - r.top;
          targetAlpha = 1;
        });
        projSec.addEventListener('mouseleave', function() {
          targetAlpha=0; activeCard=null;
          projSec.classList.remove('spotlight-mode');
          document.querySelectorAll('.pc2').forEach(function(c){ c.classList.remove('spotlight-active'); });
        });

        document.querySelectorAll('.pc2').forEach(function(card) {
          card.addEventListener('mouseenter', function() {
            activeCard = card;
            projSec.classList.add('spotlight-mode');
            document.querySelectorAll('.pc2').forEach(function(c){ c.classList.remove('spotlight-active'); });
            card.classList.add('spotlight-active');
            var fl=document.createElement('div'); fl.className='pc2-reveal-flash';
            card.appendChild(fl); setTimeout(function(){ fl.remove(); }, 600);
          });
          card.addEventListener('mouseleave', function(){ if(activeCard===card) activeCard=null; });
        });

        if (lx===-999) { lx=W/2; ly=H/2; }

        (function draw() {
          requestAnimationFrame(draw);
          sweepT += 0.0035;
          lx += (mx - lx) * 0.07;
          ly += (my - ly) * 0.07;
          alpha += (targetAlpha - alpha) * 0.055;
          ctx.clearRect(0,0,W,H);
          if (alpha < 0.008) return;
          var a = alpha;

          // Ambient glow — richer gold, more visible
          var g1 = ctx.createRadialGradient(lx,ly,0,lx,ly,Math.max(W,H)*0.48);
          g1.addColorStop(0,'rgba(212,184,74,'+(0.13*a)+')');
          g1.addColorStop(0.4,'rgba(124,109,250,'+(0.05*a)+')');
          g1.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=g1; ctx.fillRect(0,0,W,H);

          if (activeCard) {
            var cr=activeCard.getBoundingClientRect();
            var pr=projSec.getBoundingClientRect();
            var cx=cr.left-pr.left+cr.width*.5;
            var cy=cr.top-pr.top+cr.height*.5;
            var cW=cr.width, cH=cr.height;
            var cLeft=cr.left-pr.left, cTop=cr.top-pr.top;

            // Card halo
            var g2=ctx.createRadialGradient(cx,cy,0,cx,cy,cH*0.85);
            g2.addColorStop(0,'rgba(212,184,74,'+(0.18*a)+')');
            g2.addColorStop(0.45,'rgba(124,109,250,'+(0.07*a)+')');
            g2.addColorStop(1,'rgba(0,0,0,0)');
            ctx.fillStyle=g2; ctx.fillRect(0,0,W,H);

            // Tight center dot
            var g3=ctx.createRadialGradient(cx,cy,0,cx,cy,55);
            g3.addColorStop(0,'rgba(255,255,255,'+(0.13*a)+')');
            g3.addColorStop(1,'rgba(0,0,0,0)');
            ctx.fillStyle=g3; ctx.fillRect(0,0,W,H);

            // Cursor → card cone
            if (mx>0 && mx<W) {
              var dx=cx-lx, dy=cy-ly;
              var dist=Math.sqrt(dx*dx+dy*dy)||1;
              var ang=Math.atan2(dy,dx);
              ctx.save();
              ctx.globalAlpha=0.09*a;
              ctx.fillStyle='rgba(212,184,74,1)';
              ctx.beginPath(); ctx.moveTo(lx,ly);
              ctx.arc(lx,ly,dist*1.06,ang-0.27,ang+0.27);
              ctx.closePath(); ctx.fill(); ctx.restore();
            }

            // Ground reflection
            var g4=ctx.createLinearGradient(cLeft,cTop+cH,cLeft,cTop+cH+65);
            g4.addColorStop(0,'rgba(212,184,74,'+(0.08*a)+')');
            g4.addColorStop(1,'rgba(0,0,0,0)');
            ctx.fillStyle=g4; ctx.fillRect(cLeft,cTop+cH,cW,65);
          }

          // Sweep — inside active card only, clearly visible
          if (activeCard) {
            var scr2=activeCard.getBoundingClientRect();
            var spr2=projSec.getBoundingClientRect();
            var scLeft=scr2.left-spr2.left;
            var scTop=scr2.top-spr2.top;
            var scW=scr2.width, scH=scr2.height;
            var sy2=scTop+((sweepT%1))*scH;
            var sg2=ctx.createLinearGradient(0,sy2-50,0,sy2+50);
            sg2.addColorStop(0,'rgba(212,184,74,0)');
            sg2.addColorStop(0.5,'rgba(212,184,74,'+(0.32*a)+')');
            sg2.addColorStop(1,'rgba(212,184,74,0)');
            ctx.fillStyle=sg2;
            ctx.fillRect(scLeft,sy2-50,scW,100);
          } else {
            var sy=((sweepT%1))*H;
            var sg=ctx.createLinearGradient(0,sy-30,0,sy+30);
            sg.addColorStop(0,'rgba(212,184,74,0)');
            sg.addColorStop(0.5,'rgba(212,184,74,'+(0.04*a)+')');
            sg.addColorStop(1,'rgba(212,184,74,0)');
            ctx.fillStyle=sg; ctx.fillRect(0,sy-30,W,60);
          }
        })();
      }




      /* ════════════════════════════════════════════════════════
         GLOBAL KINETIC ENGINE
         Applies the kw-section scatter→orbit→assemble→float→scatter
         physics to EVERY .gk-block element on the page.
         
         Each block is independent:
         - Its own scroll progress (relative to viewport)
         - Its own scatter origin vectors per word
         - Its own velocity response
         
         Phases per block (by scroll progress 0→1):
           0.00–0.35 → ORBIT IN: words drift from scatter positions
           0.35–0.70 → HOLD: assembled + gentle float
           0.70–1.00 → SCATTER OUT: words explode outward
         
         Scroll speed → animation speed (fast=snap, slow=float)
      ════════════════════════════════════════════════════════ */
      function initGlobalKinetic() {
        var lastScrollY = window.scrollY;
        var vel = 0, vSmooth = 0;
        var blocks = [];
        var raf = null;
        var ease = 'cubic-bezier(.16,1,.3,1)';

        // Track scroll velocity
        window.addEventListener('scroll', function() {
          var dy = Math.abs(window.scrollY - lastScrollY);
          vSmooth += (dy - vSmooth) * 0.2;
          vel = vSmooth;
          lastScrollY = window.scrollY;
          if (!raf) raf = requestAnimationFrame(tickAll);
        }, { passive: true });

        // Gather all gk-blocks and init their words
        document.querySelectorAll('.gk-block').forEach(function(block) {
          var words = Array.from(block.querySelectorAll('.gk-word[data-gk]'));
          if (!words.length) return;

          // Assign scatter physics per word
          words.forEach(function(w, i) {
            // Orbit angle spread across full circle, offset by word index
            var angle = (i / Math.max(words.length, 1)) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
            var radius = 120 + Math.random() * 100;
            // Small blocks (<=3 words) get tighter scatter
            if (words.length <= 3) radius *= 0.65;
            w._gkOx    = Math.cos(angle) * radius;
            w._gkOy    = Math.sin(angle) * radius * 0.55; // flatten vertically
            w._gkRot   = (Math.random() - 0.5) * 38;
            w._gkScale = 0.35 + Math.random() * 0.3;
            w._gkIdx   = i;
            // Scatter direction for exit phase (opposite of entry)
            w._gkSx    = (Math.random() - 0.5) * 180;
            w._gkSy    = -60 - Math.random() * 90;
            w._gkSr    = (Math.random() - 0.5) * 45;

            // Set initial scattered state
            var inner = w.querySelector('.gk-inner');
            if (!inner) return;
            inner.style.transform = 'translate(' + w._gkOx.toFixed(1) + 'px,' + w._gkOy.toFixed(1) + 'px) rotate(' + w._gkRot.toFixed(1) + 'deg) scale(' + w._gkScale.toFixed(3) + ')';
            inner.style.opacity   = '0';
            inner.style.filter    = 'blur(10px)';
            inner.style.transition = 'none';
          });

          blocks.push({ el: block, words: words, progress: 0 });
        });

        function getBlockProgress(block) {
          var r = block.getBoundingClientRect();
          var vh = window.innerHeight;
          // Progress: 0 when block enters bottom of screen, 1 when block exits top
          return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        }

        function animateBlock(b, p) {
          var spd = Math.max(0.15, Math.min(3.0, 0.42 + vel * 0.08));
          var dur = (0.58 / spd).toFixed(2) + 's';

          b.words.forEach(function(w, i) {
            var inner = w.querySelector('.gk-inner');
            if (!inner) return;

            // Stagger: each word slightly delayed by index
            var stagger = (i * 0.038);
            var gOffset = stagger;

            if (p < 0.35) {
              // ── ORBIT IN PHASE ──
              // ap: 0→1 as block scrolls into view, with stagger
              var raw = (p - gOffset * 0.5) / (0.35 - gOffset * 0.3);
              var ap = Math.max(0, Math.min(1, raw));
              // Ease: cubic out for smooth arrival
              ap = 1 - Math.pow(1 - ap, 2.5);

              var ox = w._gkOx * (1 - ap);
              var oy = w._gkOy * (1 - ap);
              var rot = w._gkRot * (1 - ap);
              var sc  = w._gkScale + (1 - w._gkScale) * ap;

              inner.style.transition = 'transform ' + dur + ' ' + ease + ', opacity ' + dur + ' ease, filter ' + dur + ' ease';
              inner.style.transform  = 'translate(' + ox.toFixed(1) + 'px,' + oy.toFixed(1) + 'px) rotate(' + rot.toFixed(1) + 'deg) scale(' + sc.toFixed(3) + ')';
              inner.style.opacity    = (ap * 0.97).toFixed(3);
              inner.style.filter     = 'blur(' + (8 * (1 - ap)).toFixed(1) + 'px)';

            } else if (p < 0.68) {
              // ── HOLD + FLOAT PHASE ──
              // Gentle sine float, different per word
              var floatY = Math.sin(Date.now() / 2000 + i * 0.8) * 2.8;
              var floatX = Math.cos(Date.now() / 2800 + i * 0.5) * 1.2;
              inner.style.transition = 'opacity .4s ease, filter .4s ease';
              inner.style.transform  = 'translate(' + floatX.toFixed(2) + 'px,' + floatY.toFixed(2) + 'px) rotate(0deg) scale(1)';
              inner.style.opacity    = '1';
              inner.style.filter     = 'none';

            } else {
              // ── SCATTER OUT PHASE ──
              var sp = Math.max(0, Math.min(1, (p - 0.68) / 0.32));
              // Ease in for snappy exit
              sp = Math.pow(sp, 1.6);
              var speedOut = (0.45 / spd).toFixed(2) + 's';

              inner.style.transition = 'transform ' + speedOut + ' cubic-bezier(.4,0,1,1), opacity ' + speedOut + ' ease, filter ' + speedOut + ' ease';
              inner.style.transform  = 'translate(' + (w._gkSx * sp).toFixed(1) + 'px,' + (w._gkSy * sp).toFixed(1) + 'px) rotate(' + (w._gkSr * sp).toFixed(1) + 'deg) scale(' + (1 - sp * 0.5).toFixed(3) + ')';
              inner.style.opacity    = Math.max(0, 1 - sp * 1.4).toFixed(3);
              inner.style.filter     = sp > 0.2 ? 'blur(' + (sp * 8).toFixed(1) + 'px)' : 'none';
            }
          });
        }

        function tickAll() {
          raf = null;
          blocks.forEach(function(b) {
            var p = getBlockProgress(b.el);
            animateBlock(b, p);
          });
        }

        // Continuous float loop (runs even without scroll)
        (function floatLoop() {
          requestAnimationFrame(floatLoop);
          blocks.forEach(function(b) {
            var p = getBlockProgress(b.el);
            if (p >= 0.35 && p < 0.68) {
              b.words.forEach(function(w, i) {
                var inner = w.querySelector('.gk-inner');
                if (!inner) return;
                var fy = Math.sin(Date.now() / 2000 + i * 0.8) * 2.8;
                var fx = Math.cos(Date.now() / 2800 + i * 0.5) * 1.2;
                inner.style.transform = 'translate(' + fx.toFixed(2) + 'px,' + fy.toFixed(2) + 'px) rotate(0deg) scale(1)';
              });
            }
          });
        })();

        // Initial tick
        setTimeout(tickAll, 50);
      }

      function initKineticTypography() {
        /* ─────────────────────────────────────────────
           kw-section PHYSICS ENGINE v3
           Words start scattered in space, orbit inward,
           lock into readable text, then scatter on exit.
           Speed reacts to scroll velocity continuously.
        ───────────────────────────────────────────── */
        var section = document.getElementById('kw-section');
        if (!section) return;

        var words = Array.from(section.querySelectorAll('.kw-word'));
        var lastY = window.scrollY;
        var vel = 0, vSmooth = 0;
        var raf2 = null;
        var inView = false;

        // Assign origin scatter positions to each word
        words.forEach(function(w, i) {
          var angle = (i / words.length) * Math.PI * 2 - Math.PI / 3;
          var radius = 180 + Math.random() * 120;
          w._ox = Math.cos(angle) * radius;
          w._oy = Math.sin(angle) * radius - 60;
          w._rot = (Math.random() - 0.5) * 45;
          w._scale = 0.4 + Math.random() * 0.3;
          w._group = parseInt(w.getAttribute('data-group') || '1');
          w._idx   = parseInt(w.getAttribute('data-idx')   || '0');
          // Set initial state
          var inner = w.querySelector('.kw-word-inner') || w.querySelector('.kw-inner');
          if (inner) {
            inner.style.transform = 'translate(' + w._ox + 'px,' + w._oy + 'px) rotate(' + w._rot + 'deg) scale(' + w._scale + ')';
            inner.style.opacity = '0';
            inner.style.filter = 'blur(12px)';
          }
        });

        // Spawn ambient particles
        var parLayer = document.getElementById('kw-particles-layer');
        if (!parLayer) { parLayer = document.createElement('div'); parLayer.id='kw-particles-layer'; section.appendChild(parLayer); }

        function spawnPar() {
          var p = document.createElement('div');
          p.className = 'kw-par';
          var isB = Math.random() > 0.55;
          var sz = isB ? (10 + Math.random()*10) : (2 + Math.random()*4);
          var dur = 7 + Math.random() * 10;
          p.style.cssText = [
            'left:'    + (Math.random()*100) + '%',
            'bottom:-30px',
            'width:'   + (isB ? 'auto' : sz+'px'),
            'height:'  + (isB ? 'auto' : sz+'px'),
            'font-size:'+ (isB ? sz+'px' : '0'),
            'background:'+ (isB ? 'transparent' : ['rgba(212,184,74,.45)','rgba(124,109,250,.35)','rgba(56,189,248,.3)'][Math.floor(Math.random()*3)]),
            'animation-duration:'+dur+'s',
            'animation-delay:'+(Math.random()*4)+'s',
          ].join(';');
          if (isB) { p.textContent='⚽'; }
          parLayer.appendChild(p);
          setTimeout(function() { p.remove(); setTimeout(spawnPar, 600+Math.random()*800); }, (dur+4)*1000);
        }
        for (var pi=0;pi<10;pi++) setTimeout(spawnPar, pi*250);

        // Ghost parallax
        var ghost = document.getElementById('kw-bg-ghost');

        function getProgress() {
          var r = section.getBoundingClientRect();
          var vh = window.innerHeight;
          return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
        }

        function tick() {
          raf2 = null;
          var curY = window.scrollY;
          vSmooth += (Math.abs(curY - lastY) - vSmooth) * 0.22;
          vel = vSmooth;
          lastY = curY;

          var p = getProgress();
          var spd = Math.max(0.15, Math.min(2.8, 0.4 + vel * 0.08));
          var dur = (0.6 / spd).toFixed(2) + 's';
          var ease = 'cubic-bezier(.16,1,.3,1)';

          // Ghost parallax
          if (ghost) {
            ghost.style.transform = 'translate(-50%,-50%) translateY(' + (p * -40) + 'px)';
          }

          words.forEach(function(w, i) {
            var inner = w.querySelector('.kw-word-inner') || w.querySelector('.kw-inner');
            if (!inner) return;
            var gOffset = (w._group - 1) * 0.16 + w._idx * 0.055;

            if (p < 0.38) {
              // ORBIT PHASE: scattered around, slowly drifting in
              var ap = Math.max(0, Math.min(1, (p - gOffset * 0.6) / (0.38 - gOffset * 0.3)));
              var ox = w._ox * (1 - ap);
              var oy = w._oy * (1 - ap);
              var rot = w._rot * (1 - ap);
              var sc  = w._scale + (1 - w._scale) * ap;
              inner.style.transition = 'transform '+dur+' '+ease+', opacity '+dur+' ease, filter '+dur+' ease';
              inner.style.transform  = 'translate('+ox.toFixed(1)+'px,'+oy.toFixed(1)+'px) rotate('+rot.toFixed(1)+'deg) scale('+sc.toFixed(3)+')';
              inner.style.opacity    = (ap * 0.95).toFixed(3);
              inner.style.filter     = 'blur('+(8*(1-ap)).toFixed(1)+'px)';
            } else if (p < 0.65) {
              // HOLD PHASE: fully assembled, subtle float
              var floatY = Math.sin(Date.now() / 2200 + i * 0.7) * 2.5;
              inner.style.transition = 'transform .6s ease, opacity .4s ease, filter .4s ease';
              inner.style.transform  = 'translate(0,'+floatY.toFixed(2)+'px) rotate(0deg) scale(1)';
              inner.style.opacity    = '1';
              inner.style.filter     = 'none';
            } else {
              // SCATTER PHASE: explode outward
              var sp2 = Math.max(0, Math.min(1, (p - 0.65) / 0.35));
              var dirs = [[-1,-1],[1,-1],[-0.5,1.2],[1.1,0.3],[-1.2,0.5],[0.4,-1.3]];
              var d = dirs[i % dirs.length];
              var dist2 = 70 + i * 16;
              var rot2 = (i%2===0?1:-1) * (18 + i*9) * sp2;
              inner.style.transition = 'transform '+dur+' cubic-bezier(.4,0,1,1), opacity '+dur+' ease, filter '+dur+' ease';
              inner.style.transform  = 'translate('+(d[0]*dist2*sp2).toFixed(1)+'px,'+(d[1]*dist2*sp2).toFixed(1)+'px) rotate('+rot2.toFixed(1)+'deg) scale('+(1-sp2*0.45).toFixed(3)+')';
              inner.style.opacity    = Math.max(0, 1 - sp2*1.35).toFixed(3);
              inner.style.filter     = sp2 > 0.25 ? 'blur('+(sp2*7).toFixed(1)+'px)' : 'none';
            }
          });
        }

        // Observe to start/stop rAF
        new IntersectionObserver(function(entries) {
          inView = entries[0].isIntersecting;
        }, { threshold: 0 }).observe(section);

        window.addEventListener('scroll', function() {
          if (!raf2) raf2 = requestAnimationFrame(tick);
        }, { passive: true });

        // Float animation even when not scrolling
        (function floatLoop() {
          requestAnimationFrame(floatLoop);
          var p = getProgress();
          if (p >= 0.38 && p < 0.65) {
            words.forEach(function(w, i) {
              var inner = w.querySelector('.kw-word-inner') || w.querySelector('.kw-inner');
              if (!inner) return;
              var fy = Math.sin(Date.now() / 2200 + i * 0.7) * 2.5;
              inner.style.transform = 'translate(0,'+fy.toFixed(2)+'px) rotate(0deg) scale(1)';
            });
          }
        })();

        // Initial render
        tick();
      }


      function initProjectParticles() {
        var container = document.getElementById('proj-particles');
        if (!container) return;

        var POOL = 20;
        var active = 0;

        function spawnParticle() {
          if (active >= POOL) return;
          active++;
          var el = document.createElement('div');
          el.className = 'proj-par';
          var isFootball = Math.random() > 0.55;
          var size = isFootball ? (10 + Math.random() * 12) : (2 + Math.random() * 4);
          var dur = 9 + Math.random() * 14;
          var delay = Math.random() * 3;
          el.style.cssText = [
            'left:' + (Math.random() * 100) + '%',
            'bottom:-40px',
            'width:' + (isFootball ? 'auto' : size + 'px'),
            'height:' + (isFootball ? 'auto' : size + 'px'),
            'background:' + (isFootball ? 'transparent' : (['rgba(212,184,74,.4)','rgba(124,109,250,.3)','rgba(56,189,248,.3)','rgba(255,255,255,.15)'][Math.floor(Math.random()*4)])),
            'border-radius:50%',
            'font-size:' + (isFootball ? size + 'px' : '0'),
            'animation-duration:' + dur + 's',
            'animation-delay:' + delay + 's',
          ].join(';');
          if (isFootball) { el.textContent = '⚽'; el.style.lineHeight = '1'; }
          container.appendChild(el);
          setTimeout(function() {
            el.remove(); active--;
            setTimeout(spawnParticle, 400 + Math.random() * 600);
          }, (dur + delay) * 1000 + 500);
        }

        // Observe projects section
        var projSec = document.getElementById('projects');
        if (projSec) {
          var io = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
              for (var i = 0; i < 10; i++) setTimeout(spawnParticle, i * 200);
            }
          }, { threshold: 0.05 });
          io.observe(projSec);
        }
      }


      /* ════════════════════════════════════════
         CAROUSEL SCROLL PROGRESS
      ════════════════════════════════════════ */
      function initProjProgress() {
        var fill = document.getElementById('proj-fill');
        var outer = document.querySelector('#projects .carousel-outer');
        var track = document.getElementById('carousel-track');
        if (!fill || !outer || !track) return;

        // Update on carousel goTo
        var origGoTo = window.__carGoTo;
        function updateFill() {
          var max = Math.max(1, track.scrollWidth - outer.clientWidth);
          var cur = window.__carCurrent || 0;
          var cw  = track.children[0] ? track.children[0].offsetWidth + 2 : 432;
          var pct = Math.min(100, (cur * cw / max) * 100);
          fill.style.width = pct + '%';
        }
        // Patch goTo
        window.addEventListener('carouselMove', updateFill);
        setInterval(updateFill, 500); // fallback poll
      }


      /* ════════════════════════════════════════
         3D CARD TILT ON HOVER
      ════════════════════════════════════════ */
      function initCardTilt() {
        document.querySelectorAll('.pc2').forEach(function(card) {
          var bound = null;
          var raf   = null;
          var targetRX = 0, targetRY = 0;
          var currentRX = 0, currentRY = 0;
          var hovering = false;

          card.addEventListener('mouseenter', function() {
            bound = card.getBoundingClientRect();
            hovering = true;
            // Remove CSS transition so JS lerp controls smoothly
            card.style.transition = 'box-shadow .4s, border-color .4s, background .4s';
            startLoop();
          });

          card.addEventListener('mousemove', function(e) {
            if (!bound) bound = card.getBoundingClientRect();
            // Normalise mouse -1..+1 within card
            var nx = (e.clientX - bound.left) / bound.width  * 2 - 1; // -1 left, +1 right
            var ny = (e.clientY - bound.top)  / bound.height * 2 - 1; // -1 top,  +1 bottom
            // rotateX: positive = top tilts toward viewer (mouse near bottom)
            // rotateY: positive = right tilts toward viewer (mouse near right)
            targetRX = ny * -10; // max ±10deg vertical
            targetRY = nx *  10; // max ±10deg horizontal
          });

          card.addEventListener('mouseleave', function() {
            hovering = false;
            targetRX = 0;
            targetRY = 0;
            // Spring back, then clear
            setTimeout(function() {
              if (!hovering) {
                card.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1), box-shadow .4s, border-color .4s, background .4s';
                card.style.transform = '';
                currentRX = 0; currentRY = 0;
              }
            }, 600);
          });

          function startLoop() {
            if (raf) return;
            (function loop() {
              // Lerp toward target
              currentRX += (targetRX - currentRX) * 0.12;
              currentRY += (targetRY - currentRY) * 0.12;

              card.style.transform =
                'perspective(1000px) rotateX(' + currentRX.toFixed(3) + 'deg) rotateY(' + currentRY.toFixed(3) + 'deg) translateZ(8px) scale(1.015)';

              if (hovering || Math.abs(currentRX) > 0.05 || Math.abs(currentRY) > 0.05) {
                raf = requestAnimationFrame(loop);
              } else {
                raf = null;
              }
            })();
          }
        });
      }



      function initMagneticButtons() {
        document.querySelectorAll('.btn, .hire, .car-btn, .soc').forEach(function(btn) {
          btn.addEventListener('mousemove', function(e) {
            var r = btn.getBoundingClientRect();
            var dx = (e.clientX - r.left - r.width/2) * 0.28;
            var dy = (e.clientY - r.top  - r.height/2) * 0.28;
            btn.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
            btn.style.transition = 'transform 0s';
          });
          btn.addEventListener('mouseleave', function() {
            btn.style.transform = '';
            btn.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
          });
        });
      }

      /* ════════════════════════════════════════
         CURSOR TRAILS (desktop only)
      ════════════════════════════════════════ */
      function initCursorTrails() {
        if (window.matchMedia('(hover:none),(pointer:coarse)').matches) return;
        var NUM = 12;
        var dots = [];
        var mx = -300, my = -300;
        var palette = [
          '#7c6dfa','#8b7ffa','#9b92fa',
          '#38bdf8','#56caf8','#70d4f8',
          '#c084fc','#ca99fc',
          'rgba(212,184,74,.9)','rgba(212,184,74,.7)','rgba(212,184,74,.5)','rgba(255,255,255,.3)'
        ];
        for (var i = 0; i < NUM; i++) {
          var d = document.createElement('div');
          d.className = 'cur-trail';
          var sz = Math.max(1.5, 7 - i * 0.45);
          d.style.cssText = [
            'width:'+sz+'px','height:'+sz+'px',
            'background:'+palette[i % palette.length],
            'opacity:'+(1-i/NUM*0.72),
            'mix-blend-mode:screen',
            'z-index:9996',
          ].join(';');
          document.body.appendChild(d);
          dots.push({ el:d, x:mx, y:my });
        }
        document.addEventListener('mousemove', function(e) { mx=e.clientX; my=e.clientY; }, { passive:true });
        (function loop() {
          requestAnimationFrame(loop);
          for (var i = NUM-1; i >= 0; i--) {
            var src = i===0 ? {x:mx,y:my} : dots[i-1];
            var f = 0.25 - i * 0.014;
            dots[i].x += (src.x - dots[i].x) * Math.max(0.05, f);
            dots[i].y += (src.y - dots[i].y) * Math.max(0.05, f);
            dots[i].el.style.left = dots[i].x.toFixed(1)+'px';
            dots[i].el.style.top  = dots[i].y.toFixed(1)+'px';
            dots[i].el.style.opacity = mx < -100 ? '0' : (1 - i/NUM*0.72);
          }
        })();
      }



      /* ════════ PAGE PROGRESS BAR ════════ */
      (function() {
        var bar = document.getElementById('page-progress');
        if (!bar) return;
        window.addEventListener('scroll', function() {
          var scrolled = window.scrollY;
          var total = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (scrolled / total * 100).toFixed(2) + '%';
        }, { passive: true });
      })();

      /* ════════ ACTIVE NAV ════════ */
      (function() {
        var links = document.querySelectorAll('.nav-links a');
        var sectionIds = Array.from(links).map(function(l) {
          return l.getAttribute('href').replace('#','');
        });
        var sections = sectionIds.map(function(id) { return document.getElementById(id); }).filter(Boolean);

        function updateNav() {
          var scrollY = window.scrollY + window.innerHeight * 0.35;
          var active = null;
          sections.forEach(function(s) {
            if (s.offsetTop <= scrollY) active = s.id;
          });
          links.forEach(function(l) {
            var match = l.getAttribute('href').replace('#','') === active;
            l.classList.toggle('nav-active', match);
          });
        }
        window.addEventListener('scroll', updateNav, { passive: true });
        updateNav();
      })();

      /* ════════ ATTR BARS — count up from 0, reset when scrolled away ════════ */
      (function() {
        var bars = document.querySelectorAll('.ar');
        if (!bars.length) return;

        // Store target values and reset all fills to 0
        bars.forEach(function(bar) {
          var fill  = bar.querySelector('.ar-fill');
          var valEl = bar.querySelector('.ar-val');
          if (fill)  { fill.style.width = '0%'; fill.classList.remove('filled'); }
          if (valEl) { bar.dataset.target = valEl.textContent.trim(); valEl.textContent = '0'; }
        });

        var animated = new Set(); // track which bars have been animated

        function animateBar(bar) {
          var fill     = bar.querySelector('.ar-fill');
          var valEl    = bar.querySelector('.ar-val');
          if (!fill) return;

          var targetW   = parseFloat(fill.getAttribute('data-w') || '80');
          var targetVal = parseFloat(bar.dataset.target || targetW);
          var DURATION  = 2200; // slow, readable
          var startTime = null;

          // Reset before animating
          fill.style.width = '0%';
          fill.classList.remove('filled');
          if (valEl) valEl.textContent = '0';

          function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

          function step(ts) {
            if (!startTime) startTime = ts;
            var p     = Math.min((ts - startTime) / DURATION, 1);
            var e     = easeOut(p);
            fill.style.width = (e * targetW).toFixed(2) + '%';
            if (valEl) valEl.textContent = Math.round(e * targetVal);
            if (p < 1) {
              requestAnimationFrame(step);
            } else {
              fill.style.width = targetW + '%';
              if (valEl) valEl.textContent = Math.round(targetVal);
              fill.classList.add('filled');
            }
          }
          requestAnimationFrame(step);
        }

        function resetBar(bar) {
          var fill  = bar.querySelector('.ar-fill');
          var valEl = bar.querySelector('.ar-val');
          if (fill)  { fill.style.width = '0%'; fill.classList.remove('filled'); }
          if (valEl) valEl.textContent = '0';
          animated.delete(bar);
        }

        // Use one observer for the whole attrs container
        var attrsContainer = document.querySelector('.attrs');
        if (!attrsContainer) return;

        var io = new IntersectionObserver(function(entries) {
          var entry = entries[0];
          if (entry.isIntersecting) {
            // Scrolled INTO view — animate each bar with stagger
            bars.forEach(function(bar, i) {
              if (animated.has(bar)) return;
              animated.add(bar);
              setTimeout(function() { animateBar(bar); }, i * 120);
            });
          } else {
            // Scrolled OUT of view — reset all bars to 0
            bars.forEach(function(bar) { resetBar(bar); });
          }
        }, { threshold: 0.2 });

        io.observe(attrsContainer);
      })();
      /* ════════ NAV SCROLL STATE ════════ */
      (function(){
        var nav = document.getElementById('nav');
        if (!nav) return;
        window.addEventListener('scroll', function() {
          nav.classList.toggle('nav-scrolled', window.scrollY > 60);
        }, { passive: true });
      })();

      /* ════════ ATTR BAR LABELS REVEAL ════════ */
      (function(){
        var attrs = document.querySelector('.attrs');
        if (!attrs) return;
        var io = new IntersectionObserver(function(entries) {
          if (entries[0].isIntersecting) {
            attrs.classList.add('attrs-visible');
            io.disconnect();
          }
        }, { threshold: 0.2 });
        io.observe(attrs);
      })();


      /* ════════ HERO STAT COUNT-UP ════════ */
      (function(){
        var hstats = document.getElementById('hstats');
        if (!hstats) return;
        var nums = hstats.querySelectorAll('.hst-n');
        var targets = [];
        nums.forEach(function(n) {
          var t = n.textContent.trim();
          var val = parseFloat(t.replace(/[^\d.]/g,''));
          var suffix = t.replace(/[\d.]/g,'');
          targets.push({ el: n, val: val, suffix: suffix, orig: t });
          n.dataset.orig = t;
        });

        var io = new IntersectionObserver(function(entries) {
          if (!entries[0].isIntersecting) return;
          targets.forEach(function(t) {
            if (t.val === 0 || isNaN(t.val)) return;
            var start = 0;
            var duration = 1400;
            var startTime = null;
            var isDecimal = t.val % 1 !== 0;

            function step(ts) {
              if (!startTime) startTime = ts;
              var progress = Math.min((ts - startTime) / duration, 1);
              var ease = 1 - Math.pow(1 - progress, 3);
              var current = t.val * ease;
              t.el.textContent = (isDecimal ? current.toFixed(2) : Math.floor(current)) + t.suffix;
              if (progress < 1) requestAnimationFrame(step);
              else t.el.textContent = t.orig;
            }
            requestAnimationFrame(step);
          });
          io.disconnect();
        }, { threshold: 0.5 });
        io.observe(hstats);
      })();

      /* ════════ FORM INPUT LABEL FLOAT ════════ */
      (function(){
        document.querySelectorAll('#form-modal input, #form-modal textarea').forEach(function(inp) {
          inp.addEventListener('focus', function() {
            this.style.borderColor = 'rgba(124,109,250,.55)';
          });
          inp.addEventListener('blur', function() {
            this.style.borderColor = this.value ? 'rgba(124,109,250,.35)' : 'rgba(120,150,255,.18)';
          });
        });
      })();

      /* ════════ PROJ SCOREBOARD COUNT ════════ */
      (function(){
        var sb = document.querySelector('.proj-sb-num');
        if (!sb) return;
        var io = new IntersectionObserver(function(entries) {
          if (!entries[0].isIntersecting) return;
          var i = 0, target = 10;
          var t = setInterval(function() {
            sb.textContent = String(Math.floor(Math.random()*99)).padStart(2,'0');
            i++;
            if (i >= 16) { clearInterval(t); sb.textContent = target; }
          }, 70);
          io.disconnect();
        }, { threshold: 0.5 });
        io.observe(sb);
      })();

      /* ════════ SECTION AMBIENT PARALLAX ════════ */
      (function(){
        var ghosts = document.querySelectorAll('.ct-ghost, #kw-bg-ghost, .bnum');
        window.addEventListener('scroll', function() {
          var sy = window.scrollY;
          ghosts.forEach(function(g) {
            var rect = g.parentElement.getBoundingClientRect();
            var progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            g.style.transform = g.classList.contains('ct-ghost')
              ? 'translate(-50%,-50%) translateY(' + (progress * -30) + 'px) scale(' + (1 + progress*0.03) + ')'
              : 'translateY(' + (progress * -20) + 'px)';
          });
        }, { passive: true });
      })();


      /* ════════════════════════════════════════════════════
         HERO CANVAS UPGRADE — richer multicolor particles
         + mouse parallax repulsion
      ════════════════════════════════════════════════════ */
      (function upgradeHeroCanvas(){
        var canvas = document.getElementById('hc');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        // Override the fill colour with multi-colour particles
        var origDraw = ctx.fill.bind(ctx);
        var colors = [
          'rgba(124,109,250,.3)',
          'rgba(56,189,248,.2)',
          'rgba(212,184,74,.15)',
          'rgba(192,132,252,.18)',
          'rgba(255,255,255,.1)'
        ];
        var colorIdx = 0;
        // Patch beginPath to cycle colors
        var origBeginPath = ctx.beginPath.bind(ctx);
        ctx.beginPath = function() {
          ctx.fillStyle = colors[colorIdx % colors.length];
          colorIdx++;
          return origBeginPath();
        };
      })();

      /* ════════════════════════════════════════════════════
         SECTION ENTRANCE — horizontal wipe line
         A 1px line sweeps across each section on scroll enter
      ════════════════════════════════════════════════════ */
      (function sectionWipes(){
        var secs = document.querySelectorAll('#about, #exp, #projects, #contact, #intro-quote');
        var style = document.createElement('style');
        document.head.appendChild(style);

        secs.forEach(function(sec) {
          sec.style.position = 'relative';
          var wipe = document.createElement('div');
          wipe.style.cssText = [
            'position:absolute','top:0','left:0','right:0','height:1px',
            'background:linear-gradient(90deg,transparent,rgba(124,109,250,.35),rgba(212,184,74,.2),transparent)',
            'transform:scaleX(0)','transform-origin:left center',
            'transition:transform 1.2s cubic-bezier(.16,1,.3,1)','pointer-events:none','z-index:10'
          ].join(';');
          sec.appendChild(wipe);

          var io = new IntersectionObserver(function(entries) {
            if (entries[0].isIntersecting) {
              wipe.style.transform = 'scaleX(1)';
              io.disconnect();
            }
          }, { threshold: 0.05 });
          io.observe(sec);
        });
      })();

      /* ════════════════════════════════════════════════════
         ABOUT STATS — count up when visible
      ════════════════════════════════════════════════════ */
      (function aboutStatsCountUp(){
        var fcsNums = document.querySelectorAll('.fcs-n');
        if (!fcsNums.length) return;

        var io = new IntersectionObserver(function(entries) {
          if (!entries[0].isIntersecting) return;
          fcsNums.forEach(function(el) {
            var orig = el.textContent.trim();
            var val = parseFloat(orig.replace(/[^\d.]/g, ''));
            if (isNaN(val) || orig === '∞') return;
            var suffix = orig.replace(/[\d.]/g, '');
            var isDecimal = orig.includes('.');
            var start = performance.now();
            var dur = 1200;
            (function tick(now) {
              var p = Math.min((now - start) / dur, 1);
              var ease = 1 - Math.pow(1-p, 3);
              el.textContent = (isDecimal ? (val*ease).toFixed(2) : Math.floor(val*ease)) + suffix;
              if (p < 1) requestAnimationFrame(tick);
              else el.textContent = orig;
            })(start);
          });
          io.disconnect();
        }, { threshold: 0.4 });

        var card = document.querySelector('.fc-stats');
        if (card) io.observe(card);
      })();

      /* ════════════════════════════════════════════════════
         MAGNETIC CURSOR — scale cards slightly toward cursor
         when cursor is within the carousel area
      ════════════════════════════════════════════════════ */
      (function magneticCards(){
        var track = document.getElementById('carousel-track');
        if (!track) return;
        var cards = Array.from(track.querySelectorAll('.pc2'));

        track.addEventListener('mousemove', function(e) {
          cards.forEach(function(card) {
            var r = card.getBoundingClientRect();
            var cx = r.left + r.width * 0.5;
            var cy = r.top  + r.height * 0.5;
            var dx = e.clientX - cx;
            var dy = e.clientY - cy;
            var dist = Math.sqrt(dx*dx + dy*dy);
            var maxDist = 300;
            if (dist < maxDist) {
              var pull = (1 - dist/maxDist) * 0.008;
              card.style.transform = 'translateX(' + (-dx*pull).toFixed(2) + 'px) translateY(' + (-dy*pull).toFixed(2) + 'px)';
            }
          });
        });
        track.addEventListener('mouseleave', function() {
          cards.forEach(function(card) {
            card.style.transform = '';
          });
        });
      })();

      /* ════════════════════════════════════════════════════
         STAGGERED PILL ENTRANCE
      ════════════════════════════════════════════════════ */
      (function pillEntrance(){
        var pillsWrap = document.querySelector('.pills');
        if (!pillsWrap) return;
        var pills = pillsWrap.querySelectorAll('.pill');

        pills.forEach(function(p) {
          p.style.opacity = '0';
          p.style.transform = 'translateY(8px)';
          p.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.16,1,.3,1)';
        });

        var io = new IntersectionObserver(function(entries) {
          if (!entries[0].isIntersecting) return;
          pills.forEach(function(p, i) {
            setTimeout(function() {
              p.style.opacity = '1';
              p.style.transform = 'translateY(0)';
            }, i * 45);
          });
          io.disconnect();
        }, { threshold: 0.3 });
        io.observe(pillsWrap);
      })();

      /* ════════════════════════════════════════════════════
         CONTACT: letter-by-letter email reveal on hover
      ════════════════════════════════════════════════════ */
      (function emailReveal(){
        var email = document.querySelector('.ct-email');
        if (!email) return;
        var orig = email.textContent.replace('→','').trim();
        var entered = false;

        email.addEventListener('mouseenter', function() {
          if (entered) return;
          entered = true;
          var chars = orig.split('');
          email.textContent = '';
          var arrow = document.createElement('span');
          arrow.textContent = ' →';
          arrow.style.cssText = 'color:var(--gold);margin-left:8px;transition:transform .3s;display:inline-block';
          var span = document.createElement('span');
          span.textContent = '';
          email.appendChild(span);
          email.appendChild(arrow);

          chars.forEach(function(ch, i) {
            setTimeout(function() {
              span.textContent += ch;
            }, i * 22);
          });
          setTimeout(function() { entered = false; }, orig.length * 22 + 500);
        });
      })();


      /* ════════ PITCH: glow label when ball is near ════════ */
      (function patchPitchLabels() {
        var orig = window.__pitchPatched;
        if (orig) return;
        window.__pitchPatched = true;
        // Patch: after initPitch runs, add hover-glow to labels
        var origInit = window.initPitch;
        // Labels get auto-glow via CSS drop-shadow — no extra JS needed
      })();

      /* ════════ CARD TEXT CONTRAST FIX ════════ */
      (function cardTextContrast() {
        // When spotlight-active, ensure all text has dark bg
        document.querySelectorAll('.pc2').forEach(function(card) {
          card.addEventListener('mouseenter', function() {
            card.querySelectorAll('.pc2-name, .pc2-desc, .pc2-num, .ptag, .pc2-cat').forEach(function(el) {
              el.style.position = 'relative';
              el.style.zIndex = '8';
            });
          });
        });
      })();

      /* ════════ CAROUSEL DOTS: active dot slides ════════ */
      (function upgradeCarDots() {
        var dots = document.querySelectorAll('.car-dot');
        if (!dots.length) return;
        dots.forEach(function(d) {
          d.style.borderRadius = '2px';
          d.style.height = '3px';
          d.style.transition = 'width .4s cubic-bezier(.16,1,.3,1), background .3s, box-shadow .3s';
        });
      })();

      /* ════════ EP BULLETS: highlight on scroll proximity ════════ */
      (function epProximity() {
        var eps = document.querySelectorAll('.ep.gk-block');
        if (!eps.length) return;
        var io = new IntersectionObserver(function(entries) {
          entries.forEach(function(e) {
            if (e.isIntersecting && e.intersectionRatio > 0.7) {
              e.target.classList.add('ep-active');
              setTimeout(function() { e.target.classList.remove('ep-active'); }, 1200);
            }
          });
        }, { threshold: [0.7] });
        eps.forEach(function(ep) { io.observe(ep); });
      })();

      /* ════════ TICKER: pause + glow on hover ════════ */
      (function tickerHover() {
        var tw = document.querySelector('.proj-ticker-wrap');
        if (!tw) return;
        tw.style.cursor = 'default';
      })();

      /* ════════ SCROLL-LINKED HERO PARALLAX (depth) ════════ */
      (function heroDepth() {
        var h1 = document.querySelector('.h1');
        var hDesc = document.querySelector('.h-desc');
        var hStats = document.querySelector('#hstats');
        if (!h1) return;

        window.addEventListener('scroll', function() {
          var sy = window.scrollY;
          if (sy > window.innerHeight) return;
          var p = sy / window.innerHeight;
          // h1 rises slightly, desc drops slightly = depth effect
          h1.style.transform    = 'translateY(' + (p * -18).toFixed(1) + 'px)';
          if (hDesc)  hDesc.style.transform  = 'translateY(' + (p * -18).toFixed(1) + 'px)';
          if (hStats) hStats.style.transform = 'translateY(' + (p * -10).toFixed(1) + 'px)';
          h1.style.opacity = Math.max(0, 1 - p * 0.9).toFixed(3);
        }, { passive: true });
      })();

      /* ════════ SMOOTH SECTION INDICATOR (floating) ════════ */
      (function sectionIndicator() {
        var indicator = document.createElement('div');
        indicator.id = 'section-dot';
        indicator.style.cssText = [
          'position:fixed', 'right:20px', 'top:50%', 'transform:translateY(-50%)',
          'display:flex', 'flex-direction:column', 'gap:8px',
          'z-index:9990', 'pointer-events:none'
        ].join(';');

        var sections = ['hero','rocket','intro-quote','about','arsenal','kw-section','projects','exp','contact'];
        var dots = sections.map(function(id, i) {
          var dot = document.createElement('div');
          dot.style.cssText = [
            'width:4px', 'height:4px', 'border-radius:2px',
            'background:rgba(255,255,255,.15)',
            'transition:height .4s cubic-bezier(.16,1,.3,1),background .3s,box-shadow .3s',
          ].join(';');
          dot.dataset.id = id;
          indicator.appendChild(dot);
          return dot;
        });

        document.body.appendChild(indicator);

        function updateDots() {
          var midY = window.scrollY + window.innerHeight * 0.45;
          sections.forEach(function(id, i) {
            var sec = document.getElementById(id);
            if (!sec) return;
            var active = sec.offsetTop <= midY && sec.offsetTop + sec.offsetHeight > midY;
            dots[i].style.height  = active ? '20px' : '4px';
            dots[i].style.background = active ? '#d4b84a' : 'rgba(255,255,255,.15)';
            dots[i].style.boxShadow   = active ? '0 0 8px rgba(212,184,74,.6)' : 'none';
          });
        }

        window.addEventListener('scroll', updateDots, { passive: true });
        updateDots();
      })();

      window.addEventListener('scroll', function f(){ document.body.classList.add('scrolled'); window.removeEventListener('scroll',f); }, {passive:true});


      /* ════════ TECH STACK PILLS — hover dim others ════════ */
      (function initStackPills() {
        var row = document.getElementById('pills-row');
        if (!row) return;
        var pills = Array.from(row.querySelectorAll('.spill'));

        pills.forEach(function(pill) {
          pill.addEventListener('mouseenter', function() {
            // NO has-hover dim — just highlight this pill
            pill.classList.add('spill-active');
          });
          pill.addEventListener('mouseleave', function() {
            pill.classList.remove('spill-active');
            // Small delay before removing has-hover so transition is smooth
            setTimeout(function() {
              if (!row.querySelector('.spill-active')) {
                row.classList.remove('has-hover');
              }
            }, 80);
          });
        });

        // Staggered entrance when scrolled into view
        var io = new IntersectionObserver(function(entries) {
          if (!entries[0].isIntersecting) return;
          pills.forEach(function(p, i) {
            p.style.opacity = '0';
            p.style.transform = 'translateY(10px)';
            p.style.transition = 'opacity .5s ease ' + (i*0.03) + 's, transform .5s cubic-bezier(.16,1,.3,1) ' + (i*0.03) + 's';
            setTimeout(function() {
              p.style.opacity = '1';
              p.style.transform = 'translateY(0)';
            }, 60 + i * 30);
          });
          // After entrance, restore normal transition
          setTimeout(function() {
            pills.forEach(function(p) {
              p.style.transition = '';
            });
          }, 60 + pills.length * 30 + 600);
          io.disconnect();
        }, { threshold: 0.3 });
        var stadium = document.getElementById('pills-stadium');
        if (stadium) io.observe(stadium);
      })();

      /* ════════ TECH STACK — stadium board interaction ════════ */
      (function initStackPills() {
        var grid = document.getElementById('pills-row');
        if (!grid) return;
        var items = Array.from(grid.querySelectorAll('.spill'));

        // Set CSS variable for dot color per item
        items.forEach(function(item) {
          var dot = item.querySelector('.spill-dot');
          if (dot) {
            var bg = dot.style.background || '#d4b84a';
            item.style.setProperty('--dot-col', bg);
          }
        });

        // Hover: spotlight one, dim others
        items.forEach(function(item) {
          item.addEventListener('mouseenter', function() {
            grid.classList.add('has-hover');
            items.forEach(function(p) { p.classList.remove('spill-active'); });
            item.classList.add('spill-active');
          });
          item.addEventListener('mouseleave', function() {
            item.classList.remove('spill-active');
            setTimeout(function() {
              if (!grid.querySelector('.spill-active')) {
                grid.classList.remove('has-hover');
              }
            }, 60);
          });
        });

        // Staggered entrance
        var io = new IntersectionObserver(function(entries) {
          if (!entries[0].isIntersecting) return;
          items.forEach(function(p, i) {
            p.style.opacity = '0';
            p.style.transform = 'translateY(12px)';
            setTimeout(function() {
              p.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.16,1,.3,1)';
              p.style.opacity = '1';
              p.style.transform = 'translateY(0)';
            }, 40 + i * 28);
          });
          setTimeout(function() {
            items.forEach(function(p) {
              p.style.transition = '';
              p.style.opacity = '';
              p.style.transform = '';
            });
          }, 40 + items.length * 28 + 600);
          io.disconnect();
        }, { threshold: 0.2 });
        var board = document.getElementById('pills-stadium');
        if (board) io.observe(board);
      })();


      /* ════════ PITCH NODE CLICK POPUP ════════ */
      (function initNodePopup() {
        var expData = {
  "REACT.JS":       {"years":"1 yr","desc":"Built 6+ projects","color":"#7c6dfa"},
  "NODE.JS":        {"years":"1 yr","desc":"REST APIs, servers","color":"#38bdf8"},
  "NEXT.JS":        {"years":"1 yr","desc":"SSR, full-stack apps","color":"#c084fc"},
  "MONGODB":        {"years":"1 yr","desc":"MERN stack DBs","color":"#2dd4bf"},
  "EXPRESS.JS":     {"years":"1 yr","desc":"Backend framework","color":"#c084fc"},
  "TYPESCRIPT":     {"years":"1 yr","desc":"Type-safe JS","color":"#38bdf8"},
  "JAVASCRIPT":     {"years":"1 yr","desc":"Core language","color":"#fbbf24"},
  "PYTHON":         {"years":"1 yr","desc":"Scripting & AI","color":"#34d399"},
  "PHP":            {"years":"1 yr","desc":"Server-side logic","color":"#7c6dfa"},
  "MYSQL":          {"years":"1 yr","desc":"Relational DBs","color":"#2dd4bf"},
  "WORDPRESS":      {"years":"1 yr","desc":"Client sites & CMS","color":"#38bdf8"},
  "GIT / GITHUB":   {"years":"1 yr","desc":"Version control","color":"#f97316"},
  "GIT":            {"years":"1 yr","desc":"Version control","color":"#f97316"},
  "HTML / CSS":     {"years":"1 yr","desc":"Markup & styling","color":"#fbbf24"},
  "HTML/CSS":       {"years":"1 yr","desc":"Markup & styling","color":"#fbbf24"},
  "REST API":       {"years":"1 yr","desc":"Integration & fetch","color":"#4ade80"},
  "FIREBASE":       {"years":"1 yr","desc":"Realtime DB & auth","color":"#fb923c"},
  "GROQ API":       {"years":"1 yr","desc":"LLM integration","color":"#a78bfa"},
  "THREE.JS":       {"years":"1 yr","desc":"3D & WebGL scenes","color":"#f472b6"},
  "FRAMER":         {"years":"1 yr","desc":"Motion & design","color":"#ec4899"},
  "TAILWIND":       {"years":"1 yr","desc":"CSS framework","color":"#06b6d4"},
  "TAILWIND CSS":   {"years":"1 yr","desc":"CSS framework","color":"#06b6d4"},
  "VERCEL":         {"years":"1 yr","desc":"Deployments","color":"#e2e8f0"},
  "NETLIFY":        {"years":"1 yr","desc":"Hosting & CI/CD","color":"#38bdf8"},
  "LEAFLET.JS":     {"years":"1 yr","desc":"Maps & geolocation","color":"#34d399"},
  "WPBAKERY":       {"years":"1 yr","desc":"WordPress page builder","color":"#7c6dfa"},
  "SHOPIFY":        {"years":"1 yr","desc":"E-commerce builds","color":"#4ade80"},
  "HUBSPOT":        {"years":"1 yr","desc":"CRM & lead capture","color":"#fb923c"}
}
        var popup = document.getElementById('node-popup');
        if (!popup) return;

        var npName  = document.getElementById('np-name');
        var npYears = document.getElementById('np-years');
        var npDesc  = document.getElementById('np-desc');

        // Wait for initPitch to create the label divs
        function attachClicks() {
          var labels = document.querySelectorAll('.pitch-label-wrap, [class*="pitch-label"]');
          // Also query by the style signature of label divs
          var allDivs = document.querySelectorAll('#arsenal > div[style*="z-index:30"]');
          allDivs.forEach(function(div) {
            div.style.pointerEvents = 'all';
            div.style.cursor = 'pointer';
            div.addEventListener('click', function(e) {
              e.stopPropagation();
              var nameEl = div.querySelector('[style*="fbbf24"], [style*="d4b84a"]');
              var tech = nameEl ? nameEl.textContent.trim() : '';
              if (tech && window.showTechPopup) window.showTechPopup(tech, e.clientX, e.clientY);
            });
          });
          // Also hook into the pitch canvas click
          var canvas = document.getElementById('pc');
          if (!canvas) return;

          canvas.style.cursor = 'pointer';
          canvas.addEventListener('click', function(e) {
            // Find nearest node label
            var allLabels = document.querySelectorAll('[data-pitch-label]');
            // Fallback: find sf nodes
            var sfNodes = document.querySelectorAll('.sf-n');
            // Use the pitch's internal node positions via a custom event
            document.dispatchEvent(new CustomEvent('pitchClick', {detail: {x: e.clientX, y: e.clientY} }));
          });

          // Hook into dynamically created pitch label elements
          var observer = new MutationObserver(function(muts) {
            muts.forEach(function(m) {
              m.addedNodes.forEach(function(node) {
                if (node.nodeType !== 1) return;
                // pitch label div
                var nameEl = node.querySelector && (node.querySelector('[style*="fbbf24"]') || node.querySelector('[style*="d4b84a"]'));
                if (nameEl) {
                  var tech = nameEl.textContent.trim();
                  node.style.cursor = 'pointer';
                  node.addEventListener('click', function(e) {
                    e.stopPropagation();
                    showPopup(tech, e.clientX, e.clientY);
                  });
                }
              });
            });
          });
          var pitchSec = document.getElementById('arsenal');
          if (pitchSec) observer.observe(pitchSec, {childList: true, subtree: true});
        }

        function showPopup(tech, x, y) {
          // Case-insensitive lookup — pitch labels are UPPERCASE
          var techKey = tech;
          var techUpper = tech.toUpperCase().trim();
          var keys = Object.keys(expData);
          for (var ki = 0; ki < keys.length; ki++) {
            var k = keys[ki].toUpperCase();
            if (k === techUpper ||
                k.replace(/[\.\s]/g,'') === techUpper.replace(/[\.\s]/g,'') ||
                techUpper.indexOf(k.split('.')[0]) !== -1 ||
                k.indexOf(techUpper.split(' ')[0]) !== -1) {
              techKey = keys[ki];
              break;
            }
          }
          var data = expData[techKey] || expData[tech] || expData[tech.replace(' / ','/')] || expData[tech.split(' ')[0]];
          if (!data) return;
          npName.textContent  = tech;
          npYears.textContent = '⬤  ' + data.years + '  experience';
          npDesc.textContent  = data.desc;
          npName.style.color  = data.color || '#fbbf24';
          popup.style.display = 'block';
          // Position near cursor
          var pw = 200, ph = 90;
          var left = Math.min(x + 16, window.innerWidth  - pw - 16);
          var top  = Math.max(y - 60, 16);
          if (top + ph > window.innerHeight - 16) top = y - ph - 10;
          popup.style.left = left + 'px';
          popup.style.top  = top  + 'px';
          popup.style.opacity = '0';
          popup.style.transform = 'translateY(6px) scale(.95)';
          popup.style.transition = 'opacity .2s ease, transform .25s cubic-bezier(.16,1,.3,1)';
          popup.style.pointerEvents = 'none';
          requestAnimationFrame(function() {
            popup.style.opacity = '1';
            popup.style.transform = 'translateY(0) scale(1)';
          });
          clearTimeout(popup._hide);
          popup._hide = setTimeout(hidePopup, 2800);
        }

        function hidePopup() {
          popup.style.opacity = '0';
          popup.style.transform = 'translateY(4px) scale(.97)';
          setTimeout(function() { popup.style.display = 'none'; }, 220);
        }

        // Expose so initPitch can call it
        window.showTechPopup = showPopup;

        // Click anywhere to close
        document.addEventListener('click', function(e) {
          if (!popup.contains(e.target)) hidePopup();
        });

        setTimeout(attachClicks, 800);
      })();


      /* ════════ PILLS SEQUENTIAL GOLD HIGHLIGHT ON SCROLL ════════ */
      (function pillsScrollHighlight() {
        var stadium = document.getElementById('pills-stadium');
        if (!stadium) return;
        var pills = Array.from(document.querySelectorAll('#pills-row .spill'));
        if (!pills.length) return;

        var triggered = false;
        var currentIdx = -1;
        var intervalId = null;

        function runSequence() {
          if (triggered) return;
          triggered = true;
          currentIdx = 0;

          // Reset all
          pills.forEach(function(p) {
            p.classList.remove('spill-seq');
            p.style.borderColor = '';
            p.style.color = '';
            p.style.boxShadow = '';
          });

          function highlightNext() {
            // Remove previous
            if (currentIdx > 0) {
              pills[currentIdx - 1].classList.remove('spill-seq');
            }
            if (currentIdx >= pills.length) {
              // Done — leave last one highlighted briefly then reset
              setTimeout(function() {
                pills[pills.length - 1].classList.remove('spill-seq');
                triggered = false; // allow retriggering
              }, 800);
              return;
            }
            pills[currentIdx].classList.add('spill-seq');
            currentIdx++;
            intervalId = setTimeout(highlightNext, 90);
          }
          highlightNext();
        }

        // Trigger on scroll into view (both enter from bottom AND from top)
        var lastScrollY = window.scrollY;
        var io = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              setTimeout(runSequence, 200);
            }
          });
        }, { threshold: 0.3 });
        io.observe(stadium);

        // Also retrigger when scrolling UP into view
        var prevAbove = false;
        window.addEventListener('scroll', function() {
          var rect = stadium.getBoundingClientRect();
          var inView = rect.top < window.innerHeight && rect.bottom > 0;
          var nowAbove = rect.bottom < 0;

          // Coming back into view from above (scroll up)
          if (!inView && prevAbove && !nowAbove) {
            triggered = false;
          }
          if (inView && !triggered) {
            setTimeout(runSequence, 150);
          }
          prevAbove = nowAbove;
          lastScrollY = window.scrollY;
        }, { passive: true });
      })();

      function initCursor() {
        var c1 = document.getElementById('c1'), c2 = document.getElementById('c2');
        if (!c1 || !c2) return;
        var mx = 0, my = 0, tx = 0, ty = 0;
        c1.style.left = '-100px'; c1.style.top = '-100px';
        c2.style.left = '-100px'; c2.style.top = '-100px';
        document.addEventListener('mousemove', function (e) {
          mx = e.clientX; my = e.clientY;
          c1.style.left = mx + 'px'; c1.style.top = my + 'px';
        });
        document.querySelectorAll('a,button,.pc2,.cert,.soc,.hst,.pill').forEach(function (el) {
          el.addEventListener('mouseenter', function () { c1.style.width = '22px'; c1.style.height = '22px'; c2.style.width = '48px'; c2.style.height = '48px'; c2.style.opacity = '.35'; });
          el.addEventListener('mouseleave', function () { c1.style.width = '8px'; c1.style.height = '8px'; c2.style.width = '34px'; c2.style.height = '34px'; c2.style.opacity = '1'; });
        });
        // Smooth trailing ring
        (function curLoop() {
          requestAnimationFrame(curLoop);
          tx += (mx - tx) * .12;
          ty += (my - ty) * .12;
          c2.style.left = tx + 'px'; c2.style.top = ty + 'px';
        })();
      }

      /* ════════════════════════════════════════
         VIDEO MODAL + CONTACT FORM
      ════════════════════════════════════════ */
      (function () {
        var btn = document.getElementById('open-form-btn');
        var modal = document.getElementById('form-modal');
        var video = document.getElementById('modal-video');
        var card = document.getElementById('form-card');
        var closeBtn = document.getElementById('close-modal');
        var form = document.getElementById('contact-form');
        var success = document.getElementById('f-success');

        // Style inputs on focus
        modal.querySelectorAll('input,textarea').forEach(function (el) {
          el.addEventListener('focus', function () { this.style.borderColor = 'rgba(124,109,250,.6)'; this.style.background = 'rgba(124,109,250,.06)' });
          el.addEventListener('blur', function () { this.style.borderColor = 'rgba(120,150,255,.18)'; this.style.background = 'rgba(255,255,255,.04)' });
        });

        function openModal() {
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
          // Fade in video
          setTimeout(function () {
            video.style.opacity = '1';
            video.play().catch(function () { });
          }, 50);
          // Show form card after short delay
          setTimeout(function () {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 400);
        }

        function closeModal() {
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px)';
          video.style.opacity = '0';
          setTimeout(function () {
            modal.style.display = 'none';
            video.pause();
            video.currentTime = 0;
            document.body.style.overflow = '';
            success.style.display = 'none';
            form.reset();
          }, 600);
        }

        if (btn) btn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        // Close on backdrop click
        modal.addEventListener('click', function (e) {
          if (e.target === modal) closeModal();
        });

        // ESC key
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && modal.style.display !== 'none') closeModal();
        });

        // Form submit — EmailJS
        if (form) form.addEventListener('submit', function (e) {
          e.preventDefault();
          var sub = document.getElementById('f-submit');
          sub.textContent = 'Sending...';
          sub.style.opacity = '.7';
          sub.disabled = true;

          var name = document.getElementById('f-name').value;
          var email = document.getElementById('f-email').value;
          var phone = document.getElementById('f-phone').value;
          var message = document.getElementById('f-msg').value;

          emailjs.send('service_12pas6m', 'template_jy9swrv', {
            from_name: name,
            from_email: email,
            phone: phone || 'Not provided',
            message: message,
            to_email: 'vasuduttpareek@gmail.com',
            reply_to: email
          }).then(function () {
            sub.style.display = 'none';
            success.style.display = 'block';
          }, function (err) {
            sub.textContent = 'Send Message ✦';
            sub.style.opacity = '1';
            sub.disabled = false;
            alert('Oops! Something went wrong. Please email directly: vasuduttpareek@gmail.com\n\nError: ' + (err.text || JSON.stringify(err)));
          });
        });
      })();

      /* ════════════════════════════════════════
         BATMAN AI CHATBOT
      ════════════════════════════════════════ */
      (function () {
        var batmanbtn = document.getElementById('batman-btn');
        var chat = document.getElementById('messi-chat');
        var closeChat = document.getElementById('close-chat');
        var input = document.getElementById('chat-input');
        var sendBtn = document.getElementById('chat-send');
        var msgs = document.getElementById('chat-msgs');

        var KB = [
          { q: ['skill', 'stack', 'tech', 'know', 'use'], a: "Vasu is a <strong>Full Stack MERN Developer</strong> 🚀<br><br>Frontend: React.js, Next.js, TypeScript, HTML/CSS<br>Backend: Node.js, Express.js, PHP, Laravel<br>Database: MongoDB, MySQL<br>CMS: WordPress, WPBakery, Shopify<br>Tools: Git, HubSpot, REST API, Vercel, Netlify" },
          { q: ['project', 'work', 'build', 'pokedex', 'fieldturf', 'prepzee', 'coffee'], a: "Here are his top projects ⚽<br><br><strong>01 — Pokemon Pokédex</strong><br>React.js · REST API · State Management<br><br><strong>02 — FieldTurf Landscape</strong><br>WordPress · PHP · HubSpot CRM · SEO<br><br><strong>03 — Prepzee Platform</strong><br>WordPress · PHP · MySQL · Custom CPT<br><br><strong>04 — Coffee Tracker</strong><br>React · Firebase · Real-time data" },
          { q: ['experience', 'job', 'intern', 'itxit', 'work'], a: "Vasu is currently a <strong>Jr. Web Developer Intern at iTXIT Pro</strong> (June 2025 – Present) 💼<br><br>He builds WordPress sites, custom PHP backends, MySQL databases, and handles full client deployment & SEO." },
          { q: ['hire', 'contact', 'work together', 'project', 'freelance', 'cost', 'price'], a: "Ready to build something great? 🔥<br><br>📧 vasuduttpareek@gmail.com<br>📱 +91 9461744900<br><br>Hit the <strong>✦ Let's Talk</strong> button in the contact section to send him a message directly!" },
          { q: ['certificate', 'cert', 'meta', 'google', 'cloud'], a: "Vasudutt holds 3 certifications 🎖<br><br>✦ Front End Developer by Meta<br>✦ Cloud Digital Leader by Google<br>✦ Bits and Bytes by Google" },
          { q: ['education', 'vit', 'college', 'degree', 'cgpa', 'gpa'], a: "He studies at <strong>VIT Vellore</strong> 🎓<br>B.Tech in Computer Science<br>CGPA: <strong>7.62</strong><br>Graduation: 2026" },
          { q: ['messi', 'who are you', 'what are you', 'name', 'bot'], a: "I'm <strong>Batman AI</strong> ⚽ — Vasudutt's personal AI assistant! Named after the GOAT himself 🐐<br><br>I know everything about Vasu's skills, projects, experience, and more. Ask me anything!" },
          { q: ['hello', 'hi', 'hey', 'hola', 'sup', 'greet'], a: "Hola! 👋 Great to meet you! I'm Batman AI, here to help you learn about Vasudutt Pareek — Full Stack MERN Developer. What would you like to know? 🚀" },
          { q: ['react', 'node', 'mongodb', 'express', 'wordpress', 'php'], a: "Yes, Vasu is strong with that! His MERN stack expertise covers React.js, Node.js, MongoDB & Express.js. He also does WordPress, PHP, and MySQL for CMS-based projects. Want to see his projects? 👀" },
        ];

        function getReply(q) {
          q = q.toLowerCase();
          for (var i = 0; i < KB.length; i++) {
            for (var j = 0; j < KB[i].q.length; j++) {
              if (q.indexOf(KB[i].q[j]) > -1) return KB[i].a;
            }
          }
          return "Good question! 🤔 I'm still learning about that. But you can reach Vasu directly at <strong>vasuduttpareek@gmail.com</strong> or click <strong>✦ Let's Talk</strong> — he'd love to connect! ⚽";
        }

        function addMsg(text, isUser) {
          var div = document.createElement('div');
          div.className = isUser ? 'msg-user' : 'msg-ai';
          div.innerHTML = text;
          msgs.appendChild(div);
          msgs.scrollTop = msgs.scrollHeight;
          return div;
        }

        function showTyping() {
          var t = document.createElement('div');
          t.className = 'msg-ai';
          t.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>';
          msgs.appendChild(t);
          msgs.scrollTop = msgs.scrollHeight;
          return t;
        }

        function send(text) {
          if (!text.trim()) return;
          addMsg(text, true);
          input.value = '';
          var typing = showTyping();
          setTimeout(function () {
            typing.remove();
            addMsg(getReply(text), false);
          }, 900 + Math.random() * 500);
        }

        window.sendQuick = function (text) { send(text); };

        if (sendBtn) sendBtn.addEventListener('click', function () { send(input.value) });
        if (input) input.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(input.value) });
        if (batmanbtn) batmanbtn.addEventListener('click', function () {
          chat.style.display = chat.style.display === 'none' || chat.style.display === '' ? 'block' : 'none';
        });
        if (closeChat) closeChat.addEventListener('click', function () {
          chat.style.display = 'none';
        });
      })();

      /* ════════════════════════════════════════
         TECH STACK PILLS — CLICK TO SHOW POPUP
      ════════════════════════════════════════ */
      (function () {
        // Wait for showTechPopup to be ready (defined in initNodePopup)
        function attachPillClicks() {
          if (!window.showTechPopup) {
            setTimeout(attachPillClicks, 300);
            return;
          }
          var pills = document.querySelectorAll('#pills-row .spill');
          pills.forEach(function (pill) {
            pill.addEventListener('click', function (e) {
              e.stopPropagation();
              window.showTechPopup(pill.textContent.trim(), e.clientX, e.clientY);
              // Brief gold flash on the pill
              pill.style.transition = 'border-color .15s, color .15s, box-shadow .15s';
              pill.style.borderColor = 'rgba(212,184,74,.8)';
              pill.style.color = '#d4b84a';
              pill.style.boxShadow = '0 0 14px rgba(212,184,74,.35)';
              setTimeout(function () {
                pill.style.borderColor = '';
                pill.style.color = '';
                pill.style.boxShadow = '';
              }, 600);
            });
          });
        }
        attachPillClicks();
      })();

    }); // end DOMContentLoaded
  