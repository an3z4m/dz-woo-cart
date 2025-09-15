# DZ Woo Cart

### A WooCommerce plugin for Algerian Wilayas & Communes

**DZ Woo Cart** is a lightweight and essential WordPress plugin designed to enhance the WooCommerce checkout experience for e-commerce stores operating in Algeria. It extends the standard WooCommerce checkout form by adding a complete list of Algerian Wilayas (provinces) and a dynamic, accurate dropdown for Communes (cities).

This ensures that your customers can provide a precise and valid address, simplifying shipping, logistics, and delivery management.

---

### 🚀 Features

* **Complete Wilaya List:** Adds all 58 Algerian Wilayas to the WooCommerce state list for the country "Algeria (DZ)".
* **Dynamic Communes Dropdown:** A new "Commune" field is automatically added to the checkout form. This field dynamically populates with the correct list of communes as soon as a customer selects a Wilaya.
* **Seamless Integration:** Integrates perfectly with the standard WooCommerce checkout process without requiring any custom theme modifications.
* **Ready for Translation:** Built with internationalization in mind, making it easy to translate the Wilaya and Commune names.
* **Lightweight & Efficient:** The plugin is designed to be minimal and performant, using native WordPress and WooCommerce hooks.

### 💾 Installation

1.  **Download:** Download the plugin files from the repository.
2.  **Upload:** Upload the `dz-woo-cart` folder to the `/wp-content/plugins/` directory of your WordPress installation.
3.  **Activate:** Go to the 'Plugins' menu in your WordPress dashboard and activate the **"DZ Woo Cart"** plugin.

**Note:** This plugin requires **WooCommerce** to be installed and active. The plugin will automatically deactivate itself and display an administrative notice if WooCommerce is not found.

### 👨‍💻 Usage

Once activated, the plugin works automatically.

* On the WooCommerce checkout page, a new **Commune** dropdown will appear below the Wilaya (State) field.
* When a customer selects a Wilaya, the Commune dropdown will automatically be filled with the corresponding list of cities.

### 📸 Screenshots

![WooCommerce Checkout with DZ Woo Cart Plugin](https://i.imgur.com/example-screenshot.png)
*A visual representation of the Wilaya and Commune dropdowns on the WooCommerce checkout page.*

### 🛠️ Compatibility

* **WordPress:** 5.0 or higher
* **WooCommerce:** 4.0 or higher

### 🤝 Support

For support, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/an3z4m/dz-woo-cart/issues).

### 📜 License

This plugin is released under the **GPLv2 or later** license.

### 📝 Changelog

* **1.1.0 (2025-09-15)**
    * Added dynamic Commune dropdown based on Wilaya selection.
    * Improved code structure with a main plugin class.
    * Added a WooCommerce dependency check.
    * Corrected text domain for internationalization.
* **1.0.0 (2025-09-10)**
    * Initial release.
    * Added all 58 Algerian Wilayas to the WooCommerce state list.