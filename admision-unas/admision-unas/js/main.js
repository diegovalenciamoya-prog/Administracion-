(() => {
  const data = window.ADMISION_DATA;
  const $ = (selector) => document.querySelector(selector);

  // Menú responsive
  const menuToggle = $("#menuToggle");
  const mainNav = $("#mainNav");
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  const header = document.querySelector(".site-header");
  const desktopHeader = window.matchMedia("(min-width: 681px)");
  let previousScrollY = window.scrollY;
  let headerUpdatePending = false;

  window.addEventListener("scroll", () => {
    if (!desktopHeader.matches || headerUpdatePending) return;
    headerUpdatePending = true;
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > previousScrollY;
      header.classList.toggle("is-away", scrollingDown && currentScrollY > 150);
      if (currentScrollY <= 150 || !scrollingDown) header.classList.remove("is-away");
      previousScrollY = currentScrollY;
      headerUpdatePending = false;
    });
  }, { passive: true });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealTargets = document.querySelectorAll(
      ".section-heading, .step-card, .enroll-panel, .requirements-grid, .fee-card, .payment-methods, .campaign-banner, .biometric-box, .timeline, .help-grid"
    );
    document.documentElement.classList.add("motion-enabled");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

    revealTargets.forEach(target => {
      target.classList.add("reveal");
      revealObserver.observe(target);
    });
  }

  const sectionLinks = [...mainNav.querySelectorAll('a[href^="#"]')]
    .map(link => ({ link, section: document.getElementById(link.hash.slice(1)) }))
    .filter(item => item.section);
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const currentSection = entries.find(entry => entry.isIntersecting)?.target;
      if (!currentSection) return;
      sectionLinks.forEach(({ link, section }) => {
        if (section === currentSection) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-25% 0px -65% 0px" });
    sectionLinks.forEach(({ section }) => sectionObserver.observe(section));
  }

  // Tabla de carreras
  const careerTable = $("#careerTable");
  const careerCount = $("#careerCount");
  const careerFee = $("#careerFee");
  const examDateLabel = `${data.examDate.day} ${data.examDate.month} ${data.examDate.year}`.toUpperCase();

  $("#processLabel").textContent = data.process;
  $("#examProcess").textContent = data.process;
  $("#datesProcess").textContent = data.process;
  $("#footerProcess").textContent = data.process;
  $("#examType").textContent = `EXAMEN ${data.examType.toUpperCase()}`;
  $("#examDay").textContent = data.examDate.day;
  $("#examMonth").textContent = data.examDate.month.toUpperCase();
  $("#examYear").textContent = data.examDate.year;
  $("#heroVirtualDate").textContent = data.dates.virtual;
  $("#heroInPersonDate").textContent = data.dates.inPerson;
  $("#heroBiometricDate").textContent = data.dates.biometric;
  $("#virtualDate").textContent = data.dates.virtual.toUpperCase();
  $("#inPersonDate").textContent = data.dates.inPerson.toUpperCase();
  $("#biometricDate").textContent = data.dates.biometric.toUpperCase();
  $("#timelineExamDate").textContent = examDateLabel;
  $("#timelineExamType").textContent = `Examen de admisión ${data.examType.toLowerCase()}`;
  const vacancyTotal = data.careers.reduce((total, career) => total + career.vacancies, 0);
  $("#vacancyTotal").textContent = vacancyTotal;
  $("#careerExamType").textContent = `Examen ${data.examType}`;
  $("#careerProcess").textContent = data.process;
  $("#careerVacancyTotal").textContent = vacancyTotal;
  const [biometricDay, biometricMonth, biometricYear] = data.dates.biometric.split(" ");
  $("#biometricDay").textContent = `${biometricDay} ${biometricMonth.slice(0, 3).toUpperCase()}`;
  $("#biometricYear").textContent = biometricYear;

  if (data.logo) {
    document.querySelectorAll(".brand-logo").forEach(image => {
      image.src = data.logo;
      image.hidden = false;
      image.addEventListener("error", () => { image.hidden = true; }, { once: true });
    });
  }

  if (data.banner.enabled && data.banner.image) {
    const banner = $("#campaignBanner");
    const bannerImage = $("#campaignBannerImage");
    bannerImage.src = data.banner.image;
    bannerImage.alt = data.banner.alt;
    banner.hidden = false;
    bannerImage.addEventListener("error", () => { banner.hidden = true; }, { once: true });
  }

  function renderCareers() {
    careerTable.innerHTML = data.careers.map(c => `
      <tr><td>${String(c.id).padStart(2,"0")}</td><td>${escapeHtml(c.name)}</td><td>${c.vacancies}</td></tr>
    `).join("");
    careerCount.textContent = `${data.careers.length} carreras`;
  }
  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
  }
  data.careers.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id;
    option.textContent = `${String(c.id).padStart(2,"0")} · ${c.name}`;
    careerFee.appendChild(option);
  });
  renderCareers();

  // Comparador de tarifas referenciales
  function updateFee() {
    const id = Number(careerFee.value);
    if (!id) {
      $("#publicFee").textContent = "S/ —";
      $("#privateFee").textContent = "S/ —";
      $("#feeNote").textContent = "Selecciona una carrera para consultar.";
      return;
    }
    const special = data.fees.specialCareerIds.includes(id);
    const fees = special ? data.fees.special : data.fees.general;
    $("#publicFee").textContent = `S/ ${fees.publico.toFixed(2)}`;
    $("#privateFee").textContent = `S/ ${fees.privado.toFixed(2)}`;
    $("#feeNote").textContent = "Importe referencial; confirma el tarifario oficial.";
  }
  careerFee.addEventListener("change", updateFee);

  // Checklist de requisitos
  const checks = [...document.querySelectorAll("#requirementsList input[type=checkbox]")];
  function updateChecklist() {
    const done = checks.filter(input => input.checked).length;
    $("#checkProgress").style.width = `${done / checks.length * 100}%`;
    $("#checkCount").textContent = `${done} de ${checks.length} documentos revisados`;
  }
  checks.forEach(input => input.addEventListener("change", updateChecklist));
  updateChecklist();

  // Copiar cuenta bancaria
  const toast = $("#toast");
  let toastTimer;
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }
  $("#copyAccount").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(data.bankAccount);
      showToast("Número de cuenta copiado.");
    } catch {
      showToast(`Cuenta: ${data.bankAccount}`);
    }
  });
  $("#bankAccount").textContent = data.bankAccount;
})();
