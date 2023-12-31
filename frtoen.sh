# Set up the keywords array
keywords_french=(
    "Argan",
    "Spa",
    "Hôtel",
    "Détente",
    "Bien-être",
    "Luxe",
    "Soins",
    "Évasion",
    "Tranquillité",
    "Sérénité",
    "Massage",
    "Aromathérapie",
    "Revitaliser",
    "Renouveau",
    "Holistique",
    "Harmonie",
    "Retraite",
    "Indulgence",
    "Détox",
    "Thérapie",
    "Station",
    "Relaxation",
    "Cocooning",
    "Pamper",
    "Détente",
    "Réconfort",
    "Calme",
    "Repos",
    "Revigorer",
    "Sauna",
    "Guérison",
    "Lounge",
    "Évasion",
    "Éclat",
    "Pureté",
    "Gourmet",
    "Nature",
    "Équilibre",
    "Tranquille",
    "Renouveler",
    "Spacieux",
    "Zénitude",
    "Vitalité",
    "Recharger",
    "Nourrir",
    "Apaisant",
    "Luxe",
    "Thermal",
    "Sculpter",
    "Éveiller",
    "Harmoniser",
    "Rééquilibrer",
    "Rêver",
    "Soutenir",
    "Nectar",
    "Joie",
    "Élysée",
    "Cocon",
    "Respirer",
    "Silhouette",
    "Vue",
    "Plonger",
    "Luire",
    "Azur",
    "Jardin",
    "Boutique",
    "Exquis",
    "Enchanté",
    "Béatitude",
    "Savourer",
    "Durer",
    "Voyage",
    "Rituel",
    "Nectar",
    "Éclat",
    "Verve",
    "Extase",
    "Éthéré",
    "Lumineux",
    "Idyllique",
    "Velours",
    "Rhapsodie",
    "Choyer",
    "Épicurien",
    "Symphonie",
    "Radiance",
    "Refuge",
    "Utopie",
    "Émerger",
    "Séduction",
    "Velour",
    "Éclat",
    "Cocooning",
    "Chaleur",
    "Raffinement",
    "Argan",
    "Spa",
    "Hotel",
    "Relaxation",
    "Wellness",
    "Luxury",
    "Pampering",
    "Escape",
    "Tranquility",
    "Serene",
    "Massage",
    "Aromatherapy",
    "Rejuvenate",
    "Renewal",
    "Holistic",
    "Harmony",
    "Retreat",
    "Indulgence",
    "Detox",
    "Therapy",
    "Resort",
    "Unwind",
    "Wellbeing",
    "Oasis",
    "Meditation",
    "Facial",
    "Mindfulness",
    "Refuge",
    "Comfort",
    "Calm",
    "Repose",
    "Revitalize",
    "Sauna",
    "Healing",
    "Serenity",
    "Lounge",
    "Escape",
    "Glow",
    "Purity",
    "Gourmet",
    "Nature",
    "Balance",
    "Tranquil",
    "Renew",
    "Spacious",
    "Zen",
    "Vitality",
    "Recharge",
    "Nourish",
    "Soothing",
    "Luxurious",
    "Thermal",
    "Sculpt",
    "Awaken",
    "Harmonize",
    "Rebalance",
    "Dream",
    "Sustain",
    "Nectar",
    "Joy",
    "Elysium",
    "Cocoon",
    "Breathe",
    "Silhouette",
    "Vista",
    "Plunge",
    "Glisten",
    "Azure",
    "Garden",
    "Boutique",
    "Exquisite",
    "Enchant",
    "Bliss",
    "Savor",
    "Linger",
    "Journey",
    "Ritual",
    "Nectar",
    "Gleam",
    "Verve",
    "Rapture",
    "Ethereal",
    "Luminous",
    "Idyllic",
    "Velvet",
    "Rhapsody",
    "Pamper",
    "Epicurean",
    "Symphony",
    "Radiance",
    "Haven",
    "Utopia",
    "Emerge",
    "Allure",
    "Velour",
    "Eclat",
    "Ethereal",
    "Candlelit",
    "Lull",
    "Elegance"
)
echo 'start converting'
# Remove accents from the keywords
keywords_no_accents=()
for word in "${keywords_french[@]}"; do
    word_no_accents=$(echo "$word" | iconv -t ASCII//TRANSLIT)
    keywords_no_accents+=("$word_no_accents")
    echo $word_no_accents >> 'keywords.txt';
done

echo 'done'