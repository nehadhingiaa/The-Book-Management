import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend"

i18n.use(LanguageDetector).use(initReactI18next).use(Backend).init({
    debug:true,
    fallbackLng:"en",
    returnObjects:true,
    // interpolation:{
    //     escapeValue:false,
    // },
    // backend:{
    //     laodPath:"http://localhost:8000/locals/{{lng}}/translation.json"
    // }
    resources:{
        en:{
            translation:{
                user:"buyer",
                description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum quod quis at maxime animi pariatur repellat numquam cupiditate ullam saepe!",
                homeScreenHeader:"Find your book of choice",
                bookFair:"Book Fair",
                login:"Login",
                signUp:"signup",
                loginForm:'Login Form',
                signUpForm:'SignUp Form',
                name:'Name',
                email:'Email',
                author:"Author",
                bookTitle:"Title",
                stockCount:"Stock Count",
                dontHaveAccount:'dont have account',
                cancel:"Cancel",
                seller:"Seller",
                buyer:'Buyer',
                alreadyHaveAccount:"Already have account",
                shopName:"Shop Name",
                sellerName:"Seller Name",
                dashboard:"Dashboard",
                logout:"Logout",
                books:"My Books",
                orders:"Orders",
                price:"Price",
                action:"Action",
                customer:"Customer",
                image:"Image",
                addBook:"Add Book",
                updateBook:"update Book",
                addToCart:"Add To Cart",
                

                
            },
        },
        fr:{
            translation:{
                user:"buer",
                 description:"L'entreprise elle-même est une entreprise très prospère. Car ce que l’on est le plus disposé à supporter, il n’est jamais repoussé par aucun désir !",
                 homeScreenHeader:"trouvez le livre de votre choix",
                 bookFair:"Salon du livre",
                 login:"se connecter",
                 signUp:"s'inscrire",
                 loginForm:'formulaire de connexion',
                 signUpForm:"Formulaire d'inscription",
                 name:'Nom',
                 email:'E-mail',
                 author:"Auteure",
                 bookTitle:"Titre",
                 stockCount:"Inventaire des stocks",
                 dontHaveAccount:"je n'ai pas de compte",
                 cancel:"Annuler",
                 seller:"Vendeuse",
                 buyer:'Acheteuse',
                 alreadyHaveAccount:"Vous avez déjà un compte",
                 shopName:"Nom de la boutique",
                 sellerName:"Nom du vendeur",
                 dashboard:"Tableau de bord",
                 logout:"Déconnexion",
                 books:"Mes livres",
                 orders:"Ordres",
                 price:"Prix",
                 action:"Action",
                 customer:"Cliente",
                 image:"Image",
                 addBook:"Ajouter des livres",
                 updateBook:"mettre à jour le livre",
                 addToCart:"Ajouter au panier",



                },
        },
        hi:{
            translation:{
                user:"क्रेता",
                 description:"कंपनी अपने आप में एक बेहद सफल कंपनी है. चूँकि जिसे जन्म देने के लिए कोई सबसे अधिक इच्छुक होता है, उसे कभी भी किसी भी इच्छा से विकर्षित नहीं किया जाता है!",
                 homeScreenHeader:"अपनी पसंद की पुस्तक ढूंढें",
                 search:"खोज",
                 bookFair:"पुस्तक मेला",
                 login:"लॉग इन करें",
                 signUp:"साइन अप करें",
                 loginForm:'लॉगिन फॉर्म',
                 signUpForm:'साइन अप फॉर्म',
                 name:'नाम',
                 email:'ईमेल',
                 author:"लेखक",
                 bookTitle:"शीर्षक",
                 stockCount:"स्टॉक गणना",
                 dontHaveAccount:'खाता नहीं है',
                 cancel:"रद्द करना",
                 seller:"विक्रेता",
                 buyer:'क्रेता',
                 alreadyHaveAccount:"पहले से ही खाता है",
                 shopName:"दुकान का नाम",
                 sellerName:"विक्रेता का नाम",
                 dashboard:"डैशबोर्ड",
                 logout:"लॉग आउट",
                 books:"मेरी पुस्तकें",
                 orders:"आदेश",
                 price:"कीमत",
                 action:"कार्रवाई",
                 customer:"ग्राहक",
                 image:"छवि",
                 addBook:"पुस्तक जोड़ें",
                updateBook:"अद्यतन पुस्तक",
                addToCart:"कार्ट में जोड़ें",


            },
        },
    }
})