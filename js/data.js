/**
 * GLOSERIOUSIN - Luxury Skincare Brand Data
 */

const GLOSERIOUSIN_DATA = {
  brand: {
    name: "GLOSERIOUSIN",
    tagline: "Glow Naturally. Feel Unstoppable.",
    announcement: "FREE SHIPPING ON ORDERS OVER $50 • DISCOVER YOUR GLOW",
    freeShippingThreshold: 50
  },
  
  categories: [
    {
      id: "skincare",
      name: "Skincare",
      subtitle: "Discover",
      tagline: "Botanical elixirs for luminous skin",
      image: "assets/images/category-skincare.jpg"
    },
    {
      id: "face",
      name: "Face",
      subtitle: "Discover",
      tagline: "Weightless essentials for radiant clarity",
      image: "assets/images/category-face.jpg"
    },
    {
      id: "haircare",
      name: "Haircare",
      subtitle: "Discover",
      tagline: "Nourishing oils for silken softness",
      image: "assets/images/category-haircare.jpg"
    },
    {
      id: "bodycare",
      name: "Body Care",
      subtitle: "Discover",
      tagline: "Sensorial body rituals from head to toe",
      image: "assets/images/category-bodycare.jpg"
    },
    {
      id: "fragrance",
      name: "Fragrance",
      subtitle: "Discover",
      tagline: "Intimate botanical notes of morning gardens",
      image: "assets/images/category-fragrance.jpg"
    },
    {
      id: "suncare",
      name: "Sun Care",
      subtitle: "Discover",
      tagline: "Weightless mineral shield & radiant barrier defense",
      image: "assets/images/category-face.jpg"
    },
    {
      id: "newarrivals",
      name: "New Arrivals",
      subtitle: "Discover",
      tagline: "Our newest formulations, freshly bottled",
      image: "assets/images/category-newarrivals.jpg"
    }
  ],

  products: [
    {
      id: "dew-glow-serum",
      name: "Dew Glow Serum",
      brandName: "GLOSERIOUSIN Dew Glow Serum",
      category: "Skincare",
      categorySlug: "skincare",
      subCategory: "SERUM",
      price: 38,
      rating: 4.9,
      reviewCount: 142,
      isBestSeller: true,
      isNew: false,
      tag: "Best Seller",
      image: "assets/images/dew-glow-serum.jpg",
      gallery: [
        "assets/images/dew-glow-serum.jpg",
        "assets/images/glow-edit-bottle.jpg",
        "assets/images/hero-glow.jpg"
      ],
      size: "30 ml / 1.0 fl oz",
      shortDescription: "A lightweight glow-boosting serum created to hydrate and leave skin looking fresh, smooth, and naturally radiant.",
      description: "A lightweight glow-boosting serum created to hydrate and leave skin looking fresh, smooth, and naturally radiant. Powered by multi-molecular hyaluronic acid, fermented rosehip extract, and niacinamide, this award-winning elixir drenches the barrier in dewy moisture without any heaviness or sticky residue.",
      benefits: [
        "Deep multi-depth barrier hydration",
        "Silky, weightless texture that melts on contact",
        "Skin-loving botanical actives for natural luminescence",
        "Dermatologist tested and suitable for daily morning & evening use"
      ],
      ingredients: "Aqua (Water), Rosa Damascena Flower Water, Sodium Hyaluronate, Niacinamide (Vitamin B3), Rosa Canina (Rosehip) Seed Oil, Camellia Sinensis Leaf Extract, Glycerin, Squalane (Olive-Derived), Tocopherol (Vitamin E), Ethylhexylglycerin, Phenoxyethanol.",
      howToUse: "Dispense 3–4 drops directly onto freshly cleansed skin. Gently press into face, neck, and décolletage using upward gliding motions. Follow with Cloud Cream to seal in hydration.",
      pairsWith: ["cloud-cream", "rose-veil-mist", "radiance-oil"]
    },
    {
      id: "cloud-cream",
      name: "Cloud Cream",
      brandName: "GLOSERIOUSIN Cloud Cream",
      category: "Skincare",
      categorySlug: "skincare",
      subCategory: "MOISTURIZER",
      price: 42,
      rating: 4.9,
      reviewCount: 189,
      isBestSeller: true,
      isNew: false,
      tag: "Community Favorite",
      image: "assets/images/cloud-cream.jpg",
      gallery: [
        "assets/images/cloud-cream.jpg",
        "assets/images/dew-glow-serum.jpg",
        "assets/images/brand-story.jpg"
      ],
      size: "50 ml / 1.7 fl oz",
      shortDescription: "An airy, whipped moisturizer infused with ceramides and botanical squalane for cushion-soft skin.",
      description: "An ultra-whipped, cushiony moisturizer that blankets the skin in featherweight moisture. Formulated with five biomimetic ceramides, squalane, and oat kernel extract to soothe, replenish, and seal your natural skin barrier all day long.",
      benefits: [
        "Cloud-like whipped texture with zero greasy residue",
        "Locks in moisture for up to 48 hours",
        "Restores compromised barrier resilience",
        "Preps skin with a velvet canvas under makeup"
      ],
      ingredients: "Aqua (Water), Caprylic/Capric Triglyceride, Squalane, Butyrospermum Parkii (Shea) Butter, Ceramide NP, Ceramide AP, Ceramide EOP, Avena Sativa (Oat) Kernel Flour, Phytosphingosine, Cholesterol, Carbomer, Xanthan Gum, Phenoxyethanol.",
      howToUse: "Warm a pea-sized dollop between your fingertips and massage into clean skin following your serums. Suitable for morning and night.",
      pairsWith: ["dew-glow-serum", "rose-veil-mist", "radiance-oil"]
    },
    {
      id: "rose-veil-mist",
      name: "Rose Veil Mist",
      brandName: "GLOSERIOUSIN Rose Veil Mist",
      category: "Face",
      categorySlug: "face",
      subCategory: "HYDRATING MIST",
      price: 28,
      rating: 4.8,
      reviewCount: 96,
      isBestSeller: true,
      isNew: false,
      tag: "Daily Essential",
      image: "assets/images/rose-veil-mist.jpg",
      gallery: [
        "assets/images/rose-veil-mist.jpg",
        "assets/images/dew-glow-serum.jpg",
        "assets/images/hero-glow.jpg"
      ],
      size: "100 ml / 3.4 fl oz",
      shortDescription: "An ultra-fine rosewater mist that instantly calms, refreshes, and restores dewy radiance throughout the day.",
      description: "An ethereal micro-mist crafted with steam-distilled Damask rose petals, organic aloe vera, and soothing chamomile. Spritz whenever your skin craves a breath of dewy vitality or after makeup for a skin-like luminous finish.",
      benefits: [
        "Micro-fine diffusion that never disrupts makeup",
        "Instant cooling hydration and redness relief",
        "Subtle natural floral aroma without synthetic fragrances",
        "Perfect purse companion for on-the-go resets"
      ],
      ingredients: "Rosa Damascena (Rose) Flower Distillate, Aloe Barbadensis Leaf Juice, Hamamelis Virginiana (Witch Hazel) Water, Chamomilla Recutita (Matricaria) Flower Extract, Glycerin, Sodium PCA, Potassium Sorbate.",
      howToUse: "Hold bottle 8–10 inches from face. Close eyes and mist generously over face and neck. Use after cleansing, to set makeup, or anytime for a refreshing glow.",
      pairsWith: ["dew-glow-serum", "cloud-cream"]
    },
    {
      id: "radiance-oil",
      name: "Radiance Oil",
      brandName: "GLOSERIOUSIN Radiance Oil",
      category: "Skincare",
      categorySlug: "skincare",
      subCategory: "BOTANICAL OIL",
      price: 45,
      rating: 4.9,
      reviewCount: 114,
      isBestSeller: true,
      isNew: false,
      tag: "Luxury Elixir",
      image: "assets/images/radiance-oil.jpg",
      gallery: [
        "assets/images/radiance-oil.jpg",
        "assets/images/dew-glow-serum.jpg",
        "assets/images/brand-story.jpg"
      ],
      size: "30 ml / 1.0 fl oz",
      shortDescription: "A golden lipid elixir combining pure cold-pressed botanical oils to deeply nourish and impart an authentic lit-from-within glow.",
      description: "A fast-absorbing, multi-correctional facial oil combining cold-pressed marula, jojoba, and sea buckthorn seed oils. Drenches dull, fatigued skin in precious essential fatty acids, illuminating every curve with effortless radiance.",
      benefits: [
        "Non-comedogenic, dry-touch botanical oil blend",
        "Restores lipid moisture balance and supple elasticity",
        "Rich in antioxidant carotenoids and vitamins A, C, and E",
        "Leaves skin with a refined golden hour glow"
      ],
      ingredients: "Simmondsia Chinensis (Jojoba) Seed Oil, Sclerocarya Birrea (Marula) Seed Oil, Hippophae Rhamnoides (Sea Buckthorn) Fruit Oil, Rosa Moschata (Rosehip) Seed Oil, Helianthus Annuus Seed Oil, Boswellia Carterii (Frankincense) Oil, Citrus Aurantium Dulcis Peel Oil.",
      howToUse: "Warm 2–3 golden drops in the palms of hands. Press softly onto cheekbones, forehead, and jawline as the final step of your evening ritual, or mix a drop into your foundation.",
      pairsWith: ["cloud-cream", "dew-glow-serum"]
    },
    {
      id: "velvet-cleanser",
      name: "Velvet Cleanser",
      brandName: "GLOSERIOUSIN Velvet Cleanser",
      category: "Skincare",
      categorySlug: "skincare",
      subCategory: "CLEANSER",
      price: 32,
      rating: 4.8,
      reviewCount: 88,
      isBestSeller: false,
      isNew: true,
      tag: "New Formulation",
      image: "assets/images/product-velvet-cleanser.jpg",
      gallery: [
        "assets/images/product-velvet-cleanser.jpg",
        "assets/images/cloud-cream.jpg"
      ],
      size: "150 ml / 5.1 fl oz",
      shortDescription: "A gentle milky cream cleanser that melts impurities, SPF, and makeup while keeping skin supple and calm.",
      description: "A decadent cream-to-milk cleanser designed to remove impurities and longwear makeup without stripping essential barrier lipids. Leaves skin thoroughly cleansed, plump, and cushioned.",
      benefits: [
        "Sulfate-free, pH-balanced cleansing base",
        "Melts waterproof mascara and daily sunscreens",
        "Calming colloidal oat and prebiotic oat oils",
        "Rinses clean with no tightness or residue"
      ],
      ingredients: "Aqua, Caprylic/Capric Triglyceride, Glycerin, Cetearyl Alcohol, Decyl Glucoside, Glyceryl Stearate, Avena Sativa Kernel Extract, Allantoin, Panthenol, Citric Acid, Phenoxyethanol.",
      howToUse: "Massage 1–2 pumps over dry or damp skin in circular motions. Add warm water to emulsify into a gentle milk, then rinse clean.",
      pairsWith: ["dew-glow-serum", "cloud-cream"]
    },
    {
      id: "eye-elixir",
      name: "Botanical Eye Elixir",
      brandName: "GLOSERIOUSIN Botanical Eye Elixir",
      category: "Face",
      categorySlug: "face",
      subCategory: "EYE CARE",
      price: 36,
      rating: 4.9,
      reviewCount: 73,
      isBestSeller: false,
      isNew: true,
      tag: "Firming & Brightening",
      image: "assets/images/product-eye-elixir.jpg",
      gallery: [
        "assets/images/product-eye-elixir.jpg",
        "assets/images/dew-glow-serum.jpg"
      ],
      size: "15 ml / 0.5 fl oz",
      shortDescription: "A cooling peptide and green coffee eye concentrate that visibly awakens tired eyes and smooths delicate contours.",
      description: "An ultra-targeted fluid infused with green coffee caffeine and biomimetic peptides to visibly reduce puffiness and smooth dark shadows around the eye contour.",
      benefits: [
        "Visibly softens fine lines and expression creases",
        "Awakens under-eye shadows with botanical caffeine",
        "Cushioning botanical squalane base",
        "Safe for sensitive eyes and contact lens wearers"
      ],
      ingredients: "Aqua, Coffea Arabica Seed Extract, Palmitoyl Tripeptide-5, Squalane, Niacinamide, Sodium Hyaluronate, Camellia Japonica Seed Oil, Pullulan, Caprylyl Glycol.",
      howToUse: "Gently tap a half-pump along the orbital bone using your ring finger, working from inner to outer corners.",
      pairsWith: ["dew-glow-serum", "cloud-cream"]
    },
    {
      id: "exfoliating-polish",
      name: "Silk Exfoliating Polish",
      brandName: "GLOSERIOUSIN Silk Exfoliating Polish",
      category: "Body Care",
      categorySlug: "bodycare",
      subCategory: "EXFOLIATOR",
      price: 34,
      rating: 4.7,
      reviewCount: 61,
      isBestSeller: false,
      isNew: false,
      tag: "Smoothing Ritual",
      image: "assets/images/product-exfoliator.jpg",
      gallery: [
        "assets/images/product-exfoliator.jpg",
        "assets/images/category-bodycare.jpg"
      ],
      size: "200 ml / 6.8 fl oz",
      shortDescription: "Finely milled bamboo powder and sweet almond oil gently buff away dullness to uncover satin-soft skin.",
      description: "A nourishing body polish that combines delicate micronized bamboo with warm sweet almond and jojoba oils. Transforms dry, rough skin into silky touchable perfection.",
      benefits: [
        "Biodegradable micro-fine bamboo spherical particles",
        "Enriched with nourishing cold-pressed botanical lipids",
        "Soft natural scent of honey blossom and almond",
        "Leaves skin with a protective hydration veil"
      ],
      ingredients: "Prunus Amygdalus Dulcis (Sweet Almond) Oil, Sucrose, Bambusa Arundinacea Stem Extract, Simmondsia Chinensis Seed Oil, Tocopherol, Parfum (Natural).",
      howToUse: "Scoop a handful into wet hands and massage in gentle circular motions over shoulders, arms, legs, and heels. Rinse with warm water.",
      pairsWith: ["radiance-oil", "cloud-cream"]
    },
    {
      id: "barrier-balm",
      name: "Barrier Restore Balm",
      brandName: "GLOSERIOUSIN Barrier Restore Balm",
      category: "Skincare",
      categorySlug: "skincare",
      subCategory: "RECOVERY BALM",
      price: 40,
      rating: 5.0,
      reviewCount: 94,
      isBestSeller: false,
      isNew: false,
      tag: "Intensive Care",
      image: "assets/images/product-barrier-balm.jpg",
      gallery: [
        "assets/images/product-barrier-balm.jpg",
        "assets/images/cloud-cream.jpg"
      ],
      size: "45 ml / 1.5 fl oz",
      shortDescription: "An intensive restorative moisture melt for sensitized skin, chapped spots, and dry seasonal recovery.",
      description: "A concentrated botanical salve formulated with centella asiatica, bisabolol, and pure shea butter to soothe severely dry, irritated, or over-exfoliated skin.",
      benefits: [
        "Rich melting balm texture",
        "Instantly soothes redness and weather-exposed skin",
        "Forms a breathable moisture shield",
        "Fragrance-free and allergen-tested"
      ],
      ingredients: "Butyrospermum Parkii Butter, Squalane, Cera Alba, Centella Asiatica Extract, Bisabolol, Tocopherol, Calendula Officinalis Flower Extract.",
      howToUse: "Warm between fingers until it melts into a golden oil. Press gently onto dry patches, cuticles, or all over face as an overnight slugging mask.",
      pairsWith: ["dew-glow-serum", "cloud-cream"]
    },
    {
      id: "hair-nectar",
      name: "Golden Hair Nectar",
      brandName: "GLOSERIOUSIN Golden Hair Nectar",
      category: "Haircare",
      categorySlug: "haircare",
      subCategory: "HAIR ELIXIR",
      price: 35,
      rating: 4.8,
      reviewCount: 52,
      isBestSeller: false,
      isNew: true,
      tag: "Silken Shine",
      image: "assets/images/category-haircare.jpg",
      gallery: [
        "assets/images/category-haircare.jpg",
        "assets/images/radiance-oil.jpg"
      ],
      size: "50 ml / 1.7 fl oz",
      shortDescription: "A weightless glossing oil infused with camellia and argan to seal split ends, tame flyaways, and impart glass-like shine.",
      description: "An ethereal hair oil that infuses strands with brilliant gloss without weighing down fine locks. Protects against thermal styling and environmental stressors.",
      benefits: [
        "Tames flyaways and frizz instantly",
        "Heat defense up to 420°F",
        "Rich in antioxidant vitamin E",
        "Delicate jasmine and white tea aroma"
      ],
      ingredients: "Camellia Japonica Seed Oil, Argania Spinosa Kernel Oil, Isododecane, Tocopherol, Parfum (Natural Botanical Blend).",
      howToUse: "Apply 1–2 drops to damp or dry hair from mid-lengths to tips before air drying or heat styling.",
      pairsWith: ["radiance-oil"]
    },
    {
      id: "laura-parfum",
      name: "L'Aura Botanical Parfum",
      brandName: "GLOSERIOUSIN L'Aura Botanical Parfum",
      category: "Fragrance",
      categorySlug: "fragrance",
      subCategory: "EAU DE PARFUM",
      price: 78,
      rating: 4.9,
      reviewCount: 67,
      isBestSeller: false,
      isNew: true,
      tag: "Signature Scent",
      image: "assets/images/category-fragrance.jpg",
      gallery: [
        "assets/images/category-fragrance.jpg",
        "assets/images/dew-glow-serum.jpg"
      ],
      size: "50 ml / 1.7 fl oz",
      shortDescription: "An intimate skin scent with notes of sun-warmed bergamot, velvet white rose, amber silk, and soft cedar.",
      description: "Created to melt into your natural skin chemistry, L'Aura is a sensual, luminous fragrance that evokes the warmth of clean morning sunlight through sheer linen curtains.",
      benefits: [
        "Formulated with non-denatured organic alcohol",
        "Long-lasting intimate sillage that evolves throughout the day",
        "Hypoallergenic and phthalate-free",
        "Hand-poured in small batches in France"
      ],
      ingredients: "Organic Grain Alcohol, Parfum (Proprietary Natural Botanical Essences: Italian Bergamot, Damask Rose, Moroccan Cedar, Ambergris accord, White Musk), Water.",
      howToUse: "Spritz lightly onto pulse points: wrists, collarbone, and behind ears. Do not rub wrists together to allow top notes to blossom naturally.",
      pairsWith: ["rose-veil-mist"]
    }
  ],

  testimonials: [
    {
      id: 1,
      rating: 5,
      text: "Beautiful texture, beautiful packaging, and my skin feels incredible after using it.",
      author: "Emma R.",
      location: "New York, NY",
      verified: true,
      favoriteProduct: "Dew Glow Serum"
    },
    {
      id: 2,
      rating: 5,
      text: "The serum has become part of my everyday routine. My skin feels hydrated and fresh.",
      author: "Sophia M.",
      location: "London, UK",
      verified: true,
      favoriteProduct: "Cloud Cream"
    },
    {
      id: 3,
      rating: 5,
      text: "Everything about the brand feels thoughtful and premium.",
      author: "Olivia K.",
      location: "Paris, FR",
      verified: true,
      favoriteProduct: "Rose Veil Mist"
    }
  ],

  journalArticles: [
    {
      id: "simple-skincare-ritual",
      title: "How To Build A Simple Skincare Ritual",
      category: "SKINCARE",
      date: "September 24, 2026",
      readTime: "4 min read",
      image: "assets/images/journal-1.jpg",
      excerpt: "Step away from ten-step overwhelm. Discover how three intentional formulas can nurture your skin barrier and bring out your most luminous self.",
      content: "True skincare is not about complexity; it is about consistency and listening to what your barrier genuinely craves. Begin with gentle purification, infuse deep hydration while skin is still damp, and seal with biomimetic lipids."
    },
    {
      id: "everyday-habits-healthy-skin",
      title: "5 Everyday Habits For Healthier-Looking Skin",
      category: "BEAUTY",
      date: "September 18, 2026",
      readTime: "5 min read",
      image: "assets/images/journal-2.jpg",
      excerpt: "From mindful hydration rituals to intentional sleep hygiene, the subtle daily choices that transform your skin from the inside out.",
      content: "Luminous skin is the byproduct of harmonious living. Discover how morning hydration, gentle lymphatic stimulation, and conscious ingredient selection cultivate lasting resilience."
    },
    {
      id: "slow-beauty-ritual",
      title: "The Art Of The Slow Beauty Ritual",
      category: "LIFESTYLE",
      date: "September 10, 2026",
      readTime: "6 min read",
      image: "assets/images/journal-3.jpg",
      excerpt: "Why slowing down your morning and evening skincare routines can become the most grounding five minutes of your day.",
      content: "In an era of relentless hurry, skincare offers an invitation to pause. Feel the coolness of the glass dropper, the soothing scent of Damask rose, and honor your reflection."
    }
  ],

  instagramFeed: [
    {
      id: 1,
      image: "assets/images/insta-1.jpg",
      caption: "Morning light pouring over our Dew Glow Serum on clean travertine #GloseriousinRitual"
    },
    {
      id: 2,
      image: "assets/images/insta-2.jpg",
      caption: "Bare skin confidence. Glow naturally, feel unstoppable. #Gloseriousin"
    },
    {
      id: 3,
      image: "assets/images/insta-3.jpg",
      caption: "The evening vanity ritual. Cloud Cream & Rose Veil Mist bedside essentials."
    },
    {
      id: 4,
      image: "assets/images/insta-4.jpg",
      caption: "Sensorial textures that melt into the skin like morning dew."
    },
    {
      id: 5,
      image: "assets/images/insta-5.jpg",
      caption: "Created with clean intentions and organic cold-pressed botanicals."
    },
    {
      id: 6,
      image: "assets/images/insta-6.jpg",
      caption: "Elevate your daily ritual with our hand-poured glass formulations."
    }
  ]
};
