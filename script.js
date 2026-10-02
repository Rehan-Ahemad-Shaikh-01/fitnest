const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav-links');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('open', open);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  });
});

const roomOptions = {
  shared: {
    number: '01',
    text: 'Shared spaces for easy company, everyday connection and a place to settle in together.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85',
    alt: 'Representative shared living room inspiration',
  },
  private: {
    number: '02',
    text: 'A little more quiet and room to yourself. Ask us about private stay options and what is available.',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85',
    alt: 'Representative private room inspiration',
  },
};

const spaceImage = document.querySelector('#space-image');
document.querySelectorAll('.space-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.space-tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const option = roomOptions[tab.dataset.space];
    document.querySelector('.space-number').textContent = option.number;
    document.querySelector('.space-detail p').textContent = option.text;
    spaceImage.style.opacity = '0.3';
    window.setTimeout(() => {
      spaceImage.src = option.image;
      spaceImage.alt = option.alt;
      spaceImage.style.opacity = '1';
    }, 160);
  });
});

const form = document.querySelector('#enquiry-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const status = form.querySelector('.form-success');
  status.querySelector('p').innerHTML = '<strong>Thanks for your interest.</strong><br />This enquiry form is a preview and is not connected to an inbox yet. Connect a real form service before launch so your message reaches the Fitnest team.';
  status.classList.add('show');
  status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

const revealTargets = document.querySelectorAll('.life-card, .section-heading, .spaces-image, .values-photo, .enquiry-form');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target, index) => {
    target.classList.add('reveal');
    target.style.transitionDelay = `${(index % 3) * 80}ms`;
    observer.observe(target);
  });
}

document.querySelectorAll('.marquee-track').forEach((track) => {
  track.setAttribute('aria-hidden', 'true');
});
