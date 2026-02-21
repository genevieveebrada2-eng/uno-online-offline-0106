// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBna-Ul3PbjkDrUtFtTU3rDaCl4PVnw4Mg",
  authDomain: "uno-multiplayer-e7d24.firebaseapp.com",
  projectId: "uno-multiplayer-e7d24",
  storageBucket: "uno-multiplayer-e7d24.appspot.com",
  messagingSenderId: "120283872563",
  appId: "1:120283872563:web:dc997346aa083f29c81246"
};
firebase.initializeApp(firebaseConfig);
const db=firebase.database();

// Game Data
const baseURL="https://raw.githubusercontent.com/john-costanzo/uno-card-images/master/";
const colors=["Red","Green","Blue","Yellow"];
const specials=["Skip","Reverse","DrawTwo"];
const avatars=[...Array(10)].map((_,i)=>`https://i.pravatar.cc/50?img=${i+1}`);
let players={}, hand=[], pile=[], discard=[];
let isOffline=true, turn=0, dir=1, mustDraw=0, unoCalled=false;
let myId, roomRef;
const winningScore=50;

const handDiv=document.getElementById("hand");
const discardDiv=document.getElementById("discard");
const pileDiv=document.getElementById("pile");
const scoreboard=document.getElementById("scoreboard");
const chatBox=document.getElementById("chatBox");
const badgesDiv=document.getElementById("badges");

// Helpers
function randCard(){ const r=Math.random(); if(r<0.1) return {wild:"Wild"}; if(r<0.15) return {wild:"Wild_DrawFour"}; if(r<0.35) return {color:colors[Math.floor(Math.random()*4)], special:specials[Math.floor(Math.random()*3)]}; return {color:colors[Math.floor(Math.random()*4)], num:Math.floor(Math.random()*10)}; }
function getCardURL(c){ if(c.wild) return baseURL+c.wild+".png"; if(c.special) return baseURL+c.color+"_"+c.special+".png"; return baseURL+c.color+"_"+c.num+".png"; }
function playSound(type){ if(type==="play") sndPlay.play(); if(type==="draw") sndDraw.play(); if(type==="uno") sndUNO.play(); }

// All your previous offline/online logic, rendering, UNO, chat, rounds go here...
