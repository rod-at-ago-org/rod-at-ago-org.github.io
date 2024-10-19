barba.use(barbaCss);
barba.use(barbaPrefetch);
barba.init({
  views:[
    {
      namespace: 'home',
      beforeEnter(){
        // console.log('home before');
        typewriter({
          el: '#home-mt',
          speed: 200,
          strings: ['hello.', 'explore', 'create', 'unlock'],
          mtAfter: true
        });
      },
      afterEnter(){
        // console.log('home after');
      },
      beforeLeave(){
        // console.log('home before leave');
        document.querySelector('.page-backdrop').classList.add('active');
      }
    },
    {
      namespace: 'whoweare',
      beforeEnter(){
        // console.log('who before enter');
        typewriter({
          el: '#who-we-are-mt',
          speed: 200,
          spaceReplace: '<br class="sp"> ',
          strings: ['Who We Are']
        });
      },
      afterEnter(){
        // console.log('who after enter');
        const profileImg = document.getElementById('profile-img');
        const profileName = document.getElementById('profile-name');
        const profileDesc = document.getElementById('profile-desc');
        const profileOpener = document.getElementById('profile-opener');
        [].forEach.call(document.querySelectorAll('.launch-profile'), function(elem, idx){
          elem.addEventListener('click', function(){
            let profile = this.previousElementSibling;
            let name = profile.previousElementSibling;
            let imgSrc = this.parentNode.previousElementSibling.getAttribute('src');
            profileImg.setAttribute('src', imgSrc);
            profileName.innerHTML = name.innerHTML;
            profileDesc.innerHTML = profile.innerHTML;
            profileOpener.checked = true;
          });
        });

        profileOpener.addEventListener('change', function(){
          if(!profileOpener.checked){
            profileImg.setAttribute('src', '');
          }
        });
        
        async function tactoTextAnim(){
          const ta0 = document.getElementById('t-a-0');
          const ta1 = document.getElementById('t-a-1');
          const ta2 = document.getElementById('t-a-2');
          const ta3 = document.getElementById('t-a-3');
          const ta4 = document.getElementById('t-a-4');
          const ta5 = document.getElementById('t-a-5');
          if(ta0.textContent.length > 0){
            return;
          }
          const texts = ["tacto/", "exists", "to", "‘Unlock’", "another", "angle."];
          const speed = 20;
          
          for(let i = 0; i < texts.length; i++){
            let text = texts[i];
            for(let j = 0; j < text.length; j++){
              eval('ta' + i).textContent = text.slice(0, j + 1);
              await sleep(speed);
            }
            if((i + 1) == texts.length){
              ta3.classList.add('blink');
              // await sleep(500);
              // ta3.classList.remove('blink');
            }
          }
        }

        statementScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#statement'
        }).on('enter', function(){
          tactoTextAnim();
        }).addTo(enterController);

        memberScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#member'
        }).on('enter', function(){
          if(document.getElementById('ttl-member').textContent.length > 0){
            return;
          }
          typewriter({
            el: '#ttl-member',
            speed: 100,
            strings: ['Member']
          });
        }).addTo(enterController);

        studioScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#studio'
        }).on('enter', function(){
          if(document.getElementById('ttl-studio').textContent.length > 0){
            return;
          }
          typewriter({
            el: '#ttl-studio',
            speed: 100,
            spaceReplace: '<br class="pc"> ',
            strings: ['Our studio']
          });
        }).addTo(enterController);
    
        companyScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#company'
        }).on('enter', function(){
          if(document.getElementById('ttl-company').textContent.length > 0){
            return;
          }
          typewriter({
            el: '#ttl-company',
            speed: 100,
            spaceReplace: '<br class="pc"> ',
            strings: ['Company info']
          });
        }).addTo(enterController);
      },
      beforeLeave(){
        // console.log('who before leave');
        document.querySelector('.page-backdrop').classList.add('active');
        statementScene.destroy(true);
        memberScene.destroy(true);
        studioScene.destroy(true);
        companyScene.destroy(true);
      }
    },{
      namespace: 'whatwedo',
      beforeEnter(){
        // console.log('what before enter');
        typewriter({
          el: '#what-we-do-mt',
          speed: 250,
          strings: ['What We Do'],
          spaceReplace: '<br class="sp"> '
        });
      },
      afterEnter(){
        // console.log('what after enter');
        designScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#design'
        }).on('enter', function(){
          if(document.getElementById('ttl-design').textContent.length > 0){
            return;
          }
          typewriter({
            el: '#ttl-design',
            speed: 100,
            spaceReplace: '<br> ',
            strings: ['Story-Centered Experience Design']
          });
        }).addTo(enterController);
    
        deliverScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#deliver'
        }).on('enter', function(){
          if(document.getElementById('ttl-deliver').textContent.length > 0){
            return;
          }
          typewriter({
            el: '#ttl-deliver',
            speed: 100,
            spaceReplace: '<br class="pc"/> ',
            strings: ['What We Deliver']
          });
        }).addTo(enterController);
    
        capabilityScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#capability'
        }).on('enter', function(){
          if(document.getElementById('ttl-capability').textContent.length > 0){
            return;
          }
          typewriter({
            el: '#ttl-capability',
            speed: 100,
            spaceReplace: '<br class="pc"/> ',
            strings: ['Our Capability']
          });
        }).addTo(enterController);

        clientScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#client'
        }).on('enter', function(){
          if(document.getElementById('ttl-client').textContent.length > 0){
            return;
          }
          typewriter({
            el: '#ttl-client',
            speed: 100,
            spaceReplace: '<br class="pc"/> ',
            strings: ['Our Clients']
          });
        }).addTo(enterController);

        // spriteScene = new ScrollMagic.Scene({
        //   offset: 400,
        //   triggerElement: '#sprite-anim'
        // }).setClassToggle('#sprite-anim', 'active').addTo(enterController);
        anim = lottie.loadAnimation({
          container: document.getElementById('sprite-anim'),
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: '/assets/images/whatwedo_anim.json'
        });
        animEnterScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#sprite-anim'
        }).on('enter', function(){
          anim.play();
        }).addTo(enterController);
        animLeaveScene = new ScrollMagic.Scene({
          offset: 400,
          triggerElement: '#sprite-anim'
        }).on('leave', function(){
          anim.stop();
        }).addTo(enterController);
      },
      beforeLeave(){
        // console.log('what before leave');
        document.querySelector('.page-backdrop').classList.add('active');
        designScene.destroy(true);
        deliverScene.destroy(true);
        clientScene.destroy(true);
        // spriteScene.destroy(true);
        animEnterScene.destroy(true);
        animLeaveScene.destroy(true);
      }
    },
    {
      namespace: 'news',
      beforeEnter(){
        // console.log('news before enter');
        typewriter({
          el: '#news-mt',
          speed: 250,
          strings: ['News']
        });
      },
      beforeLeave(){
        // console.log('news before leave');
        document.querySelector('.page-backdrop').classList.add('active');
      }
    },
    {
      namespace: 'our-works',
      beforeEnter(){
        // console.log('works before enter');
        typewriter({
          el: '#works-mt',
          speed: 200,
          spaceReplace: '<br class="sp"> ',
          strings: ['Our Works']
        });
      },
      afterEnter(){
        // console.log('works after enter');
        function filterWork(filter){
          if(filter != 'all' && filter != 'brand' && filter != 'product' && filter != 'business'){
            return;
          }
          [].forEach.call(document.querySelectorAll('.filter'), function(elem, idx){
            let dataFilter = elem.getAttribute('data-filter');
            if(dataFilter.indexOf(filter) != -1){
              elem.classList.add('active');
            }else{
              elem.classList.remove('active');
            }
          });
          [].forEach.call(document.querySelectorAll('.work'), function(elem, idx){
            let tag = elem.getAttribute('data-tag');
            if(filter == 'all' || tag.indexOf(filter) != -1){
              elem.classList.remove('hide');
            }else{
              elem.classList.add('hide');
            }
          });
        };

        const params = new URLSearchParams(location.search);
        if(params.get('f') != null){
          filterWork(params.get('f'));
        }
        
        [].forEach.call(document.querySelectorAll('.filter'), function(elem, idx){
          elem.addEventListener('click', function(){
            let filter = this.getAttribute('data-filter');
            filterWork(filter);
          });
        });

        filterAllScene = new ScrollMagic.Scene({
          triggerElement: '#section-works'
        }).on('enter', function(){
          document.getElementById('body-filter').classList.add('active');
          typewriter({
            el: '#body-filter-all',
            speed: 100,
            strings: ['All']
          });
        }).on('leave', function(){
          document.getElementById('body-filter').classList.remove('active');
          document.getElementById('body-filter-all').textContent = '';
        }).addTo(leaveController);

        filterProductScene = new ScrollMagic.Scene({
          triggerElement: '#section-works'
        }).on('enter', function(){
          typewriter({
            el: '#body-filter-product',
            speed: 50,
            strings: ['Product & Service']
          });
        }).on('leave', function(){
          console.log('leave');
          document.getElementById('body-filter-product').textContent = '';
        }).addTo(leaveController);

        filterBrandScene = new ScrollMagic.Scene({
          triggerElement: '#section-works'
        }).on('enter', function(){
          typewriter({
            el: '#body-filter-brand',
            speed: 40,
            strings: ['Branded Experience']
          });
        }).on('leave', function(){
          console.log('leave');
          document.getElementById('body-filter-brand').textContent = '';
        }).addTo(leaveController);

        filterBusinessScene = new ScrollMagic.Scene({
          triggerElement: '#section-works'
        }).on('enter', function(){
          typewriter({
            el: '#body-filter-business',
            speed: 80,
            strings: ['Business']
          });
        }).on('leave', function(){
          console.log('leave');
          document.getElementById('body-filter-business').textContent = '';
        }).addTo(leaveController);
      },
      beforeLeave(){
        // console.log('works before leave');
        document.querySelector('.page-backdrop').classList.add('active');
        filterAllScene.destroy(true);
        filterProductScene.destroy(true);
        filterBrandScene.destroy(true);
        filterBusinessScene.destroy(true);
      }
    },
    {
      namespace: 'contact',
      beforeEnter(){
        // console.log('contact before enter');
        typewriter({
          el: '#contact-mt',
          speed: 250,
          strings: ['Contact']
        });
      },
      afterEnter(){
        btnContactSubmit = document.getElementById('btn-contact-submit');
        function sendContact(e){
          e.preventDefault();
          const lastName = document.getElementById('contact-last-name').value;
          const firstName = document.getElementById('contact-first-name').value;
          const email = document.getElementById('contact-email').value;
          const tel = document.getElementById('contact-tel').value;
          const org = document.getElementById('contact-org').value
          const content = document.getElementById('contact-content').value;
          const form = document.getElementById('contact-form');
          if(!form.reportValidity()){
            return;
          }
          const msg = document.getElementById('thanx-message');
          btnContactSubmit.textContent = '送信中...';
          btnContactSubmit.disabled = true;
          axios.post('https://wi226pgp2jegiumooxzvsqscgy0rvkti.lambda-url.ap-northeast-1.on.aws/', {
            last_name: lastName,
            first_name: firstName,
            email: email,
            tel: tel,
            company_name: org,
            content: content
          }).then(res => {
            form.classList.add('hide');
            msg.classList.add('active');
            window.scrollTo(0, window.pageYOffset + document.getElementById('contact').getBoundingClientRect().top);
          }).catch(err => {
            console.log(err);
          });
          return false;
        }
        btnContactSubmit.addEventListener('click', sendContact);
      },
      beforeLeave(){
        // console.log('contact before leave');
        btnContactSubmit.removeEventListener('click', sendContact);
        document.querySelector('.page-backdrop').classList.add('active');
      }
    },
    {
      namespace: 'work',
      beforeLeave(){
        // console.log('work before leave');
        document.querySelector('.page-backdrop').classList.add('active');
      },
      afterEnter(){
        [].forEach.call(document.querySelectorAll('.cover'), function(elem, idx){
          elem.addEventListener('click', function(){
            const movieContainer = elem.nextElementSibling;
            let srcId = movieContainer.getAttribute('data-src-id');
            let myId = movieContainer.getAttribute('data-my-id');
            console.log(srcId, myId);
            elem.style.display = 'none';
            player = new YT.Player(myId, {
              videoId: srcId,
              playerVars: {
                autoplay: 1
              }
            });
          });
        });
        
        
      }
    }
  ],
  transitions:[
    {
      sync: true,
      leave(){},
      enter(){}
    }
  ]
});
barba.hooks.afterEnter(() => {
  // console.log('enter hook');
  window.scrollTo(0, 0);
  const enterTo = document.querySelector('.barba-enter-to');
  console.log(enterTo);
  if(enterTo){
    enterTo.classList.remove('barba-enter-to');
  }
});