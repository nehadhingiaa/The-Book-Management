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
                homePageHeader:"Book Fair",
                login:"Login",
                signUp:"signup",
                loginForm:'Login Form',
                signUpForm:'SignUp Form',
                name:'Name',
                email:'Email',
                dontHaveAccount:'dont have account',
                cancel:"Cancel",
                seller:"Seller",
                buyer:'Buyer',
                alreadyHaveAccount:"Already have account",
                shopName:"Shop Name",
                sellerName:"Seller Name",
            },
        },
        fr:{
            translation:{
                user:"buer",
                 description:"L'entreprise elle-même est une entreprise très prospère. Car ce que l’on est le plus disposé à supporter, il n’est jamais repoussé par aucun désir !",
                 homeScreenHeader:"trouvez le livre de votre choix",
                 homePageHeader:"Salon du livre",
                 login:"se connecter",
                 signUp:"s'inscrire",
                 loginForm:'formulaire de connexion',
                 signUpForm:"Formulaire d'inscription",
                 name:'Nom',
                 email:'E-mail',
                 dontHaveAccount:"je n'ai pas de compte",
                 cancel:"Annuler",
                 seller:"Vendeuse",
                 buyer:'Acheteuse',
                 alreadyHaveAccount:"Vous avez déjà un compte",
                 shopName:"Nom de la boutique",
                 sellerName:"Nom du vendeur",
                },
        },
        hi:{
            translation:{
                user:"क्रेता",
                 description:"कंपनी अपने आप में एक बेहद सफल कंपनी है. चूँकि जिसे जन्म देने के लिए कोई सबसे अधिक इच्छुक होता है, उसे कभी भी किसी भी इच्छा से विकर्षित नहीं किया जाता है!",
                 homeScreenHeader:"अपनी पसंद की पुस्तक ढूंढें",
                 search:"खोज",
                 homePageHeader:"पुस्तक मेला",
                 login:"लॉग इन करें",
                 signUp:"साइन अप करें",
                 loginForm:'लॉगिन फॉर्म',
                 signUpForm:'साइन अप फॉर्म',
                 name:'नाम',
                 email:'ईमेल',
                 dontHaveAccount:'खाता नहीं है',
                 cancel:"रद्द करना",
                 seller:"विक्रेता",
                 buyer:'क्रेता',
                 alreadyHaveAccount:"पहले से ही खाता है",
                 shopName:"दुकान का नाम",
                 sellerName:"विक्रेता का नाम",
                 

            },
        },
    }
})