export default class Alert {
  constructor() {
    this.path = "/json/alerts.json";
  }

  // Method to fetch data and build the HTML
  async init() {
    const alerts = await this.fetchAlerts();
    if (alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async fetchAlerts() {
    const response = await fetch(this.path);
    return await response.json();
  }

  renderAlerts(alerts) {
    // 1. Create the <section> container
    const section = document.createElement("section");
    section.className = "alert-list";

    // 2. Loop through the JSON data and build a <p> for each
    alerts.forEach((item) => {
      const p = document.createElement("p");
      p.textContent = item.message;
      p.style.backgroundColor = item.background;
      p.style.color = item.color;
      section.appendChild(p);
    });

    // 3. Prepend to the <main> element
    const main = document.querySelector("main");
    main.prepend(section);
  }
}
