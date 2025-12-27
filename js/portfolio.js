document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("portfolioWrapper");
  const adminBtn = document.getElementById("adminBtn");
  const modal = document.getElementById("adminModal");
  const saveBtn = document.getElementById("saveProjectBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  const catEnInput = document.getElementById("catEn");
  const catArInput = document.getElementById("catAr");
  const titleEnInput = document.getElementById("titleEn");
  const titleArInput = document.getElementById("titleAr");
  const descEnInput = document.getElementById("descEn");
  const descArInput = document.getElementById("descAr");
  const mediaUrlInput = document.getElementById("mediaUrl");

  // Projects array
  let projects = JSON.parse(localStorage.getItem("projects") || "[]");

  // إذا projects فارغة ضع المشاريع الافتراضية
  if (projects.length === 0) {
    projects = [
      {catEn:"ERPNext", catAr:"ERPNext", titleEn:"ERP Implementation", titleAr:"تطبيق ERP", descEn:"Full ERP solution", descAr:"حل ERP متكامل", media:"assets/images/demo3.jpg"},
      {catEn:"Power BI", catAr:"Power BI", titleEn:"Sales Dashboard", titleAr:"لوحة متابعة المبيعات", descEn:"Interactive dashboards", descAr:"لوحات تفاعلية", media:"assets/images/demo1.jpg"},
      {catEn:"Automation", catAr:"الأتمتة", titleEn:"Workflow Automation", titleAr:"أتمتة سير العمل", descEn:"Automate tasks", descAr:"أتمتة المهام", media:"assets/images/demo4.jpg"}
    ];
    localStorage.setItem("projects", JSON.stringify(projects));
  }

  // عرض المشاريع
  function renderProjects() {
    wrapper.innerHTML = "";
    projects.forEach(p=>{
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <img src="${p.media}" alt="${p.titleEn}">
        <span data-en="${p.catEn}" data-ar="${p.catAr}"></span>
        <h4 data-en="${p.titleEn}" data-ar="${p.titleAr}"></h4>
        <p data-en="${p.descEn}" data-ar="${p.descAr}"></p>
      `;
      wrapper.appendChild(card);
    });
    switchLang(); // لتحديث اللغة
  }

  // Admin Modal Events
  adminBtn.addEventListener("click", ()=> modal.style.display="flex");
  cancelBtn.addEventListener("click", ()=> modal.style.display="none");
saveBtn.addEventListener("click", () => {
  // التحقق من وجود العنوان و الرابط
  

  const newProject = {
    catEn: catEnInput.value || "Category",
    catAr: catArInput.value || "فئة",
    titleEn: titleEnInput.value,
    titleAr: titleArInput.value || "عنوان",
    descEn: descEnInput.value || "",
    descAr: descArInput.value || "",
    media: mediaUrlInput.value
  };

  projects.push(newProject);                  // أضف المشروع للمصفوفة
  localStorage.setItem("projects", JSON.stringify(projects)); // احفظه في LocalStorage
  renderProjects();                           // رندر جديد للمشاريع فورًا
  modal.style.display = "none";               // إغلاق Modal
  // مسح الحقول
  catEnInput.value = "";
  catArInput.value = "";
  titleEnInput.value = "";
  titleArInput.value = "";
  descEnInput.value = "";
  descArInput.value = "";
  mediaUrlInput.value = "";
});

  // Language toggle
  let isEnglish = true;
  const toggle = document.getElementById("langToggle");
  function switchLang(){
    document.querySelectorAll("[data-en]").forEach(el=>{
      el.textContent = isEnglish ? el.dataset.en : el.dataset.ar;
    });
    document.documentElement.lang = isEnglish ? "en" : "ar";
    document.body.style.direction = isEnglish ? "ltr" : "rtl";
    if(toggle) toggle.textContent = isEnglish ? "AR" : "EN";
  }
  if(toggle) toggle.addEventListener("click", ()=>{ isEnglish=!isEnglish; switchLang(); });

  // إظهار section فورًا
  document.querySelectorAll('.section-carousel').forEach(sec=> sec.classList.add('visible'));

  renderProjects(); // رندر أولي للمشاريع الافتراضية
});
