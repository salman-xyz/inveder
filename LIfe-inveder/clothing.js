// Clothing items database
const clothingItems = [
  "Abibas suit",
  "Air Bior pullover sweater",
  "Alaska winter jacket",
  "Alvin Lein T-shirt",
  "Anti Social Club hoodie",
  "Arm Pangel jacket",
  "Acic Gel Kayano sneakers",
  "black jacket with yellow trim",
  "blob longsleeve top",
  "bomber jacket with glowing elements",
  "branded insulated hoodie",
  "branded longsleeve",
  "Lui Vi desert scarf mask",
  "branded Molo T-shirt",
  "branded T-shirt",
  "bright hoodie",
  "bright StarWars hoodie",
  "Casual neon torso",
  "CDG branded T-shirt",
  "classic denim jacket",
  "collection 2022 T-shirt",
  "cropp collection T-shirt",
  "denim jacket",
  "exclusive T-shirt",
  "fur coat without a hood",
  "Grand RP collection hoodie",
  "Grand RP collection T-shirt",
  "Hilipp Lein T-shirt",
  "hoodie",
  "jacket",
  "Jacket with a hood",
  "jacket with blue luminous trim",
  "jacket with green luminous trim",
  "jacket with pink luminous trim",
  "jacket with red luminous trim",
  "jacket with T-shirt",
  "jacket with turquoise luminous trim",
  "jacket with white luminous trim",
  "Juice Wrld Vlone T-shirt",
  "Khampion T-shirt",
  "Khanel top",
  "Kupreme T-shirt",
  "Lacoste T-shirt",
  "Lui Vi jacket",
  "Lui Vi sweatshirt",
  "Lui Vi T-shirt",
  "Lui Vi top",
  "luminous LM Playboy jacket",
  "luminous LM Playboy T-shirt",
  "luminous LM Playboy top",
  "luminous T-shirt",
  "maliky hoodie",
  "maliky T-shirt",
  "Mickey Mouse T-shirt",
  "Mikachu hoodie",
  "mix collection T-shirt",
  "Muci hoodie",
  "Muci hoodie with a snake",
  "Muci Not Fake hoodie",
  "Muci sweatshirt",
  "N.E.S.A. T-shirt",
  "neon torso",
  "New Years Eve costume",
  "Niki new collection hoodie",
  "Niki tech top",
  "Niki track suit top",
  "Plain jacket with sweater",
  "Polo Kinder T-shirt",
  "Rick and Morty trendy jacket",
  "scary turtleneck T-shirt",
  "shirt new",
  "Simpsons T-shirt",
  "skinny jacket",
  "summer collection T-shirt",
  "sweatshirt",
  "swimming trunks",
  "T-shirt",
  "The West Pace jacket",
  "top",
  "trendy jacket",
  "Tron torso",
  "Tsum collection T-shirt",
  "Up-Green sweatshirt",
  "Valenciaga T-shirt",
  "VIN T-shirt",
  "vintage Abibas Olympic Jerseys",
  "bandana top",
  "Barberry corset dress",
  "body wraps kill top",
  "bomber jacket with luminous elements",
  "calligraphy dress",
  "collection 5 top",
  "corset top",
  "day dress",
  "dress",
  "dress with cutout",
  "faution top",
  "Kupreme dress",
  "long brand T-shirt",
  "low dress",
  "pullover with long sleeve",
  "short pullover",
  "sports top",
  "stylish suit",
  "summer bra",
  "summer top",
  "top 2 outerwear",
  "top with chains",
  "topic pok",
  "Watch Me sweater",
  "luminous LM Playboy sweatshirt",
  "Mikachu T-shirt",
  "winter collection dress",
  "Abibas pants",
  "Abibas sport pants",
  "Abibas sweatpants",
  "Alvin Lein pants",
  "Bersace trousers",
  "Bior pants",
  "branded pants with bunny detail",
  "bright StarWars trousers",
  "bright trousers",
  "colored pants",
  "Grand RP collection pants",
  "half-glowing pants",
  "insulated personal pants",
  "Khampion pants",
  "Khanel pants",
  "Lui Vi pants",
  "luminous Bendi pants",
  "luminous branded pants with bunny detail",
  "luminous Grand RP trousers",
  "luminous LM Playboy trousers",
  "luminous OFF pants",
  "luminous trousers",
  "Mickey Mouse pants",
  "Muci pants",
  "Muci trousers",
  "Murberry pants",
  "N.E.S.A. pants",
  "neon pants",
  "New Balance trousers",
  "new fashionable joggers",
  "Niki new collection pants",
  "Niki tech fleece pants",
  "Niki track suit pants",
  "old summer shorts",
  "pants",
  "pants split",
  "shorts",
  "skater jeans",
  "spider pants",
  "Stonislan pants",
  "summer voyage shorts",
  "swordmen pants",
  "Tron pants",
  "trousers",
  "Valenciaga pants",
  "zipper pants",
  "Abibas leggings",
  "Gussi shorts",
  "jeans",
  "Muci shorts",
  "Nik shorts with leggings",
  "Panel pants",
  "ragged jeans",
  "skirt",
  "skirt with tights",
  "S cargo pants",
  "pants with belt",
  "Abibas Marquee Boost Lows shoes",
  "Abibas Pezy Boost 700 V3 Alvah shoes",
  "Abibas Keezy Foam shoes",
  "Abibas Pro Bounce 2019 Lows shoes",
  "Bans sneakers",
  "checkered Pans sneakers",
  "Curry Flow 8 sneakers",
  "Ground Mordan 4 Retro Laser 30th shoes",
  "Keezy Boost shoes",
  "luminous Keezy Boost shoes",
  "luminous shoes",
  "Lui Vi shorts",
  "Mordan 1 shoes",
  "Mordan 6 shoes",
  "Muci branded flip-flops",
  "multi-colored Pans sneakers",
  "neon shoes",
  "Niki Ground Porce One new collection shoes",
  "Niki Shox shoes",
  "Niki Uptempo shoes",
  "Niki Zoom Freak 1 Multi-Color shoes",
  "Pans sneakers",
  "Pezy Boost shoes",
  "red sneakers",
  "RGB neon shoes",
  "Rocs",
  "shoes",
  "sneakers",
  "trainers",
  "Tron shoes",
  "luminous Up-Green Keezy Boost shoes",
  "Up-Green Keezy Boost shoes",
  "Up-Green Pezy Boost shoes",
  "Valenciaga Track shoes",
  "tall boots",
  "accessory",
  "AK-47 chain",
  "boxing gloves",
  "bracelet",
  "chain",
  "chain around the body accessory",
  "chain lost treasure neon accessory",
  "clown chain",
  "deer antler accessory",
  "deer antlers with a red nose accessory",
  "eagle necklace",
  "el primo corazon krawl on the shoulder accessory",
  "flying bear on the shoulder accessory",
  "gloves",
  "glowing nails",
  "hamster on the shoulder accessory",
  "hearts Pride glasses",
  "leon krawl on the shoulder accessory",
  "lovely bird egg on the shoulder accessory",
  "neck scarf accessory",
  "necklace",
  "neon rabbit ears",
  "owl on the shoulder accessory",
  "pixel glasses",
  "scarf",
  "shiny deer antler headband accessory",
  "six-tailed fox on the shoulder accessory",
  "snowflake glasses",
  "strong chicken on the shoulder accessory",
  "tie",
  "toothless dragon on the shoulder accessory",
  "wristband accessory",
  "beads accessory",
  "navel piercing accessory",
  "onelove chain",
  "alien with neon eyes mask",
  "anime mask",
  "assassins mask",
  "bandana mask",
  "baseball mask",
  "Bigness mask",
  "boxing helmet",
  "carnival mask",
  "Casual neon helmet",
  "cat mask",
  "Christmas tree mask",
  "clown mask",
  "cowgirl hat",
  "Craft Munk mask",
  "Cupids crown",
  "demon mask",
  "desert scarf mask",
  "devil mask",
  "earphones with a heart",
  "emoji mask",
  "evil mask",
  "exotic mask",
  "fashionista scarf mask",
  "fox mask",
  "gorilla mask",
  "handkerchief mask",
  "Jason blue mask",
  "Kazer headphones",
  "kitsune mask",
  "luminous head bag mask",
  "luminous LM Playboy mask",
  "mask",
  "Mask Broken",
  "monkey boss mask",
  "monkey mask",
  "Nik mask",
  "owl mask",
  "panama hat",
  "penguin mask",
  "pig mask",
  "purge mask",
  "raccoon mask",
  "raptor mask",
  "raven mask",
  "red stocking mask",
  "reindeer mask",
  "robot human mask",
  "robot mask",
  "rooster mask",
  "samurai mask",
  "Santa Claus mask",
  "Sashmello mask",
  "shamanic mask",
  "skeleton king mask",
  "snowboarders mask",
  "snowflake glasses",
  "snowman mask",
  "sports mask",
  "stealthy mask",
  "tied scarf mask",
  "tight mask",
  "toothy mask",
  "trending shark head hat",
  "Tron helmet",
  "TV-head mask",
  "white Lui Vi desert scarf mask with multi-colored top",
  "gold Kolex watch with black dial",
  "gold Kolex watch with rainbow bezels",
  "Kasio G-Shock watch",
  "Kolex 2 watch",
  "Kolex watch",
  "silver Kolex watch with rainbow bezels",
  "Volex 2 watch",
  "gold Kolex watch with black dial",
  "gold Kolex watch with rainbow bezels",
  "Kasio G-Shock watch",
  "Kolex 2 watch",
  "Kolex watch",
  "silver Kolex watch with rainbow bezels",
  "Volex 2 watch",
  "gold Kolex watch with black dial",
  "gold Kolex watch with rainbow bezels",
  "Kasio G-Shock watch",
  "Kolex 2 watch",
  "Kolex watch",
  "silver Kolex watch with rainbow bezels",
  "Volex 2 watch",
  "Alvin Lein backpack skin",
  "backpack skin",
  "backpack with a cat skin",
  "bear backpack skin",
  "biohazard backpack skin",
  "Bior backpack skin",
  "chain with spikes backpack skin",
  "cloud backpack skin",
  "cow backpack skin",
  "cross backpack skin",
  "classic Lui Vi backpack skin",
  "cute bear backpack skin",
  "demon backpack skin",
  "Domo backpack skin",
  "double pockets backpack skin",
  "duck backpack skin",
  "duffel bag skin",
  "G backpack skin",
  "handbag backpack skin",
  "heart backpack skin\n",
  "heart with wings backpack skin",
  "hippy bear backpack skin",
  "human backpack skin",
  "jolly bear backpack skin",
  "Kupreme backpack skin",
  "leather school backpack skin",
  "Lui Vi backpack skin",
  "LUV backpack with wings skin",
  "mini-bear backpack skin",
  "Muci backpack skin",
  "Niki backpack skin",
  "piggy keychain backpack skin",
  "plaid bunny backpack skin",
  "scary chicken backpack skin",
  "shark backpack skin",
  "skeleton cat backpack skin\n skin",
  "skeleton cheetah plush backpack skin",
  "skull backpack skin\n",
  "strawberry backpack skin",
  "sad hare backpack skin",
  "Venom backpack skin",
  "valentines cat backpack skin",
  "star bunny backpack skin",
  "fancy bear backpack skin.",
  "Volex watch",
  "Alvin Lein set",
  "Bersace set",
  "bright StarWars set",
  "Grada set",
  "Grand RP collection set",
  "Khampion set",
  "Khanel set",
  "Kupreme set",
  "Lui Vi set",
  "luminous Bendi T-shirt",
  "luminous Bendi set",
  "luminous LM Playboy set",
  "luminous OFF set",
  "Niki new collection set",
  "Tron set",
  "Valenciaga set",
  "glowing face scarf mask",
  "chain with star pendant",
  "one-colour CAP T-shirt",
  "Nik Huarache shoes",
  "Alastor McQueen oversized shoes",
  "branded monochrome T-shirt",
  "Love costume for women",
  "fluorescent cat ears",
  "Acic Gel Kayano sneakers",
  "satanic wings",
  "belted pants",
  "neon Lui Vi pants",
  "Spring Set for women",
  "fluorescent cat ears for women",
  "mask made of clips on a chain",
  "CAP T-shirt",
  "essential brand suit top",
  "Lui Vi shoulder backpack skin",
  "ston islan classic sport pants",
  "ston islan classic sportwear",
  "wide print soccer T-shirt",
  "motorcycle platform boots",
  "Rocs with neon paint",
  "brand T-shirt colourful",
  "Amire zip-up jumper",
  "brand Neon pants set new sample LW",
  "bitkin handbag skin",
  "luminous Bendi T-shirt",
  "glasses with glowing snow",
  "branded colourful T-shirt",
  "LW new sample branded neon pants set",
  "open olympics top",
  "saruko neon mask",
  "leather gothic pants",
  "neon horns with spikes",
  "luminous dress",
  "ston islan classic sport jacket",
  "wide printed football T-shirt",
  "tapered classic turtleneck",
];

let sectionCount = 1;

// Initialize the form when page loads
document.addEventListener("DOMContentLoaded", function () {
  initializeSection(1);
  setupEventListeners();
});

function initializeSection(sectionNum) {
  // Populate type options for this section
  const typeSelect = document.querySelector(
    `[data-section="${sectionNum}"].type-select`
  );
  if (typeSelect && typeSelect.children.length <= 1) {
    for (let i = 1; i <= 30; i++) {
      const option = document.createElement("option");
      option.value = ` of type ${i}`;
      option.textContent = `type ${i}`;
      typeSelect.appendChild(option);
    }
  }

  // Setup autocomplete for this section
  setupAutocomplete(sectionNum);
}

function setupAutocomplete(sectionNum) {
  const clothingNameInput = document.querySelector(
    `[data-section="${sectionNum}"].clothing-name`
  );
  const suggestionsBox = document.querySelector(
    `[data-section="${sectionNum}"].suggestions-box`
  );

  if (!clothingNameInput || !suggestionsBox) return;

  clothingNameInput.addEventListener("input", function () {
    const inputValue = this.value.toLowerCase();
    suggestionsBox.innerHTML = "";

    if (inputValue) {
      const matchingItems = clothingItems.filter((item) =>
        item.toLowerCase().includes(inputValue)
      );

      if (matchingItems.length > 0) {
        suggestionsBox.style.display = "block";
        matchingItems.forEach((item) => {
          const div = document.createElement("div");
          div.className = "suggestion-item";
          div.textContent = item;
          div.addEventListener("click", () => {
            clothingNameInput.value = item;
            suggestionsBox.style.display = "none";
          });
          suggestionsBox.appendChild(div);
        });
      } else {
        suggestionsBox.style.display = "none";
      }
    } else {
      suggestionsBox.style.display = "none";
    }
  });

  // Close suggestions when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !clothingNameInput.contains(e.target) &&
      !suggestionsBox.contains(e.target)
    ) {
      suggestionsBox.style.display = "none";
    }
  });
}

function setupEventListeners() {
  // Add section buttons
  document
    .getElementById("addSection2")
    .addEventListener("click", () => addSection(2));
  document
    .getElementById("addSection3")
    .addEventListener("click", () => addSection(3));

  // Submit and copy buttons
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
  document.getElementById("copyBtn").addEventListener("click", handleCopy);
}

function addSection(sectionNum) {
  if (sectionNum > sectionCount + 1) return;

  const sectionsContainer = document.getElementById("clothingSections");
  const newSection = createSectionHTML(sectionNum);
  sectionsContainer.insertAdjacentHTML("beforeend", newSection);

  initializeSection(sectionNum);
  sectionCount = sectionNum;

  // Update button visibility
  if (sectionNum === 2) {
    document.getElementById("addSection2").style.display = "none";
    document.getElementById("addSection3").style.display = "inline-block";
  } else if (sectionNum === 3) {
    document.getElementById("addSection3").style.display = "none";
  }
}

function createSectionHTML(sectionNum) {
  return `
        <div class="clothing-section" data-section="${sectionNum}">
            <button type="button" class="remove-section-btn" onclick="removeSection(${sectionNum})">×</button>
            <div class="section-header">
                <h5>Clothing Item ${sectionNum}</h5>
            </div>
            
            <div class="mb-4">
                <label class="form-label">Color:</label>
                <select class="form-select color-select" data-section="${sectionNum}">
                    <option value="">Select a color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="yellow">Yellow</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                    <option value="pink">Pink</option>
                    <option value="gray">Gray</option>
                    <option value="brown">Brown</option>
                    <option value="checkered">Checkered</option>
                </select>
            </div>

            <div class="mb-4">
                <label class="form-label">Clothing Name:</label>
                <div class="position-relative">
                    <input type="text" class="form-control clothing-name" data-section="${sectionNum}" placeholder="Start typing...">
                    <div class="suggestions-box" data-section="${sectionNum}"></div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label">Type:</label>
                <select class="form-select type-select" data-section="${sectionNum}">
                    <option value="">Select a type</option>
                </select>
            </div>

            <div class="mb-4">
                <label class="form-label">Gender:</label>
                <div class="d-flex gap-4">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender${sectionNum}" value="" checked>
                        <label class="form-check-label">None</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender${sectionNum}" value=" for men">
                        <label class="form-check-label">Men</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gender${sectionNum}" value=" for women">
                        <label class="form-check-label">Women</label>
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <label class="form-label">Price:</label>
                <input type="text" class="form-control price-input" data-section="${sectionNum}" placeholder="e.g. 400000 or 5M or 500K">
            </div>
        </div>
    `;
}

function removeSection(sectionNum) {
  const section = document.querySelector(
    `[data-section="${sectionNum}"].clothing-section`
  );
  if (section) {
    section.remove();

    // Update button visibility
    if (sectionNum === 2) {
      document.getElementById("addSection2").style.display = "inline-block";
      document.getElementById("addSection3").style.display = "none";
      sectionCount = 1;
    } else if (sectionNum === 3) {
      document.getElementById("addSection3").style.display = "inline-block";
      sectionCount = 2;
    }
  }
}

function formatPrice(priceInput) {
  if (!priceInput) return "Negotiable";

  const priceRegex = /^[0-9]+(\.[0-9]+)?[MK]?$/i;
  if (!priceRegex.test(priceInput)) {
    return null; // Invalid format
  }

  if (priceInput.toLowerCase().endsWith("m")) {
    const numericValue = parseFloat(priceInput.toLowerCase().replace("m", ""));
    return numericValue % 1 === 0
      ? `${numericValue.toFixed(0)} Million`
      : `${numericValue.toFixed(1)} Million`;
  } else if (priceInput.toLowerCase().endsWith("k")) {
    const numericValue =
      parseFloat(priceInput.toLowerCase().replace("k", "")) * 1000;
    return numericValue.toLocaleString("en-US").replace(/,/g, ".");
  } else {
    const numericValue = parseFloat(priceInput);
    return numericValue.toLocaleString("en-US").replace(/,/g, ".");
  }
}

function getItemData(sectionNum) {
  const color = document
    .querySelector(`[data-section="${sectionNum}"].color-select`)
    .value.trim();
  const clothingName = document
    .querySelector(`[data-section="${sectionNum}"].clothing-name`)
    .value.trim();
  const type = document
    .querySelector(`[data-section="${sectionNum}"].type-select`)
    .value.trim();
  const gender = document
    .querySelector(`input[name="gender${sectionNum}"]:checked`)
    .value.trim();
  const priceInput = document
    .querySelector(`[data-section="${sectionNum}"].price-input`)
    .value.trim();

  const formattedPrice = formatPrice(priceInput);
  if (formattedPrice === null) {
    throw new Error(
      `Invalid price format in section ${sectionNum}! Use numbers, decimals, or shorthand like "2M" or "500K".`
    );
  }

  return {
    color,
    clothingName,
    type,
    gender,
    price: formattedPrice,
    hasPrice: priceInput.trim() !== "", // Track if user actually entered a price
  };
}

function handleSubmit() {
  try {
    const transaction = document.querySelector(
      'input[name="transaction"]:checked'
    ).value;
    const isTrading = document.getElementById("trading").checked;

    const activeSections = document.querySelectorAll(".clothing-section");
    const items = [];
    const prices = [];
    const actualPrices = []; // Only prices that were actually entered

    // Collect data from all active sections
    activeSections.forEach((section) => {
      const sectionNum = section.getAttribute("data-section");
      const itemData = getItemData(sectionNum);

      if (itemData.clothingName) {
        let itemText = `${itemData.color} ${itemData.clothingName}${
          itemData.type ? " " + itemData.type : ""
        }${itemData.gender ? " " + itemData.gender.trim() : ""}`
          .replace(/\s+/g, " ")
          .trim();
        items.push(itemText);
        prices.push(itemData.price);

        // Only add to actualPrices if user entered a price
        if (itemData.hasPrice) {
          actualPrices.push(itemData.price);
        }
      }
    });

    if (items.length === 0) {
      alert("Please fill in at least one clothing item!");
      return;
    }

    // Generate output text
    let outputText = "";

    if (isTrading) {
      outputText = "Selling or trading ";
    } else {
      outputText = `${transaction} `;
    }

    // Join items with appropriate conjunctions
    if (items.length === 1) {
      outputText += items[0];
    } else if (items.length === 2) {
      outputText += `${items[0]} and ${items[1]}`;
    } else {
      outputText +=
        items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
    }

    outputText += ".";

    // Add budget/price information based on how many prices were actually entered
    const budgetLabel = transaction === "Buying" ? "Budget" : "Price";

    if (actualPrices.length === 0) {
      // No prices entered at all
      outputText += ` ${budgetLabel}: Negotiable.`;
    } else if (actualPrices.length === 1) {
      // Only 1 price entered - show just that price without "respectively"
      const price =
        actualPrices[0] === "Negotiable"
          ? actualPrices[0]
          : `$${actualPrices[0]}`;
      outputText += ` ${budgetLabel}: ${price}.`;
    } else {
      // 2 or more prices entered - show them with "respectively"
      const formattedPrices = actualPrices.map((price) =>
        price === "Negotiable" ? price : `$${price}`
      );

      if (actualPrices.length === 2) {
        outputText += ` ${budgetLabel}: ${formattedPrices[0]} and ${formattedPrices[1]} respectively.`;
      } else {
        outputText += ` ${budgetLabel}: ${formattedPrices
          .slice(0, -1)
          .join(", ")} and ${
          formattedPrices[formattedPrices.length - 1]
        } respectively.`;
      }
    }

    document.getElementById("output").textContent = outputText;
  } catch (error) {
    alert(error.message);
  }
}

function handleCopy() {
  const output = document.getElementById("output").textContent;
  if (output === "Your clothing advertisement will appear here...") {
    alert("Generate an ad first!");
    return;
  }

  navigator.clipboard.writeText(output).then(() => {
    const notification = document.getElementById("notification");
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 2000);

    // Reset form
    document.getElementById("clothingForm").reset();

    // Remove additional sections
    const sectionsToRemove = document.querySelectorAll(
      '.clothing-section[data-section="2"], .clothing-section[data-section="3"]'
    );
    sectionsToRemove.forEach((section) => section.remove());

    // Reset section count and button visibility
    sectionCount = 1;
    document.getElementById("addSection2").style.display = "inline-block";
    document.getElementById("addSection3").style.display = "none";

    document.getElementById("output").textContent =
      "Your clothing advertisement will appear here...";
  });
}
