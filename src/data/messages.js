// Data-driven apology sequence.
// Timings in seconds: fadeIn / hold / fadeOut / gap

export const messages = [
  { text: "Hey.", fadeIn: 1.5, hold: 2.0, fadeOut: 1.5, gap: 1.0, size: "normal", glow: "soft" },
  { text: "I need to say something.", fadeIn: 1.5, hold: 2.5, fadeOut: 1.5, gap: 1.2, size: "normal", glow: "soft" },

  { text: "I’m really sorry. 😔", fadeIn: 2.0, hold: 3.0, fadeOut: 2.0, gap: 1.8, size: "large", glow: "medium" },
  { text: "I know I made you cry.", fadeIn: 1.8, hold: 2.8, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },
  { text: "And I really didn’t want to.", fadeIn: 1.8, hold: 2.8, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },

  { text: "I’m not trying to ignore you.", fadeIn: 1.6, hold: 2.5, fadeOut: 1.6, gap: 1.0, size: "normal", glow: "soft" },
  { text: "I’m not trying not to talk to you.", fadeIn: 1.6, hold: 2.5, fadeOut: 1.6, gap: 1.0, size: "normal", glow: "soft" },
  { text: "I just haven’t been getting my phone or any other device.", fadeIn: 1.8, hold: 3.2, fadeOut: 1.8, gap: 1.2, size: "small", glow: "soft" },

  { text: "Today, the only thing I got was my laptop.", fadeIn: 1.7, hold: 2.8, fadeOut: 1.7, gap: 1.1, size: "small", glow: "soft" },
  { text: "And even that was only because of the science project work that’s coming up.", fadeIn: 1.8, hold: 3.5, fadeOut: 1.8, gap: 1.3, size: "small", glow: "soft" },

  { text: "And honestly... I don’t even know how long I’ll have it. 🥲", fadeIn: 2.0, hold: 3.2, fadeOut: 2.0, gap: 1.5, size: "small", glow: "soft" },
  { text: "They’re probably going to take it away again.", fadeIn: 1.7, hold: 2.8, fadeOut: 1.7, gap: 1.2, size: "normal", glow: "soft" },

  { text: "And then there’s my SEE this year.", fadeIn: 1.8, hold: 2.8, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },
  { text: "There’s a lot of pressure on me right now.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },
  { text: "There’s a lot of expectations on me.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.4, size: "normal", glow: "soft" },

  { text: "But I know that doesn’t make you feel any less hurt.", fadeIn: 2.0, hold: 3.5, fadeOut: 2.0, gap: 1.5, size: "normal", glow: "medium" },
  { text: "I know you were waiting for me. 😔", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.3, size: "normal", glow: "soft" },
  { text: "And I’m really sorry.", fadeIn: 2.0, hold: 3.0, fadeOut: 2.0, gap: 1.8, size: "large", glow: "medium" },

  { text: "I know I can’t change what happened yesterday.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.2, size: "small", glow: "soft" },
  { text: "I know I made you cry.", fadeIn: 1.8, hold: 2.7, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },
  { text: "And I’m really sorry for that. 🥲", fadeIn: 1.8, hold: 2.8, fadeOut: 1.8, gap: 1.3, size: "normal", glow: "soft" },

  { text: "Even if I can’t get my phone or my laptop...", fadeIn: 2.0, hold: 3.0, fadeOut: 2.0, gap: 1.5, size: "small", glow: "soft" },
  { text: "I’ll try my best to talk to you.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },
  { text: "At least one day a week.", fadeIn: 1.6, hold: 2.5, fadeOut: 1.6, gap: 1.2, size: "normal", glow: "soft" },
  { text: "Even if it’s only until next month.", fadeIn: 1.7, hold: 2.7, fadeOut: 1.7, gap: 1.3, size: "normal", glow: "soft" },

  { text: "Because then our midterms start from the beginning of Ashoj.", fadeIn: 1.8, hold: 3.3, fadeOut: 1.8, gap: 1.2, size: "small", glow: "soft" },
  { text: "And after that...", fadeIn: 1.8, hold: 2.0, fadeOut: 1.8, gap: 1.8, size: "normal", glow: "soft" },
  { text: "It’s going to be pure chaos because of SEE 😭", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.3, size: "small", glow: "soft" },
  { text: "And you have your BLE this year too.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },

  { text: "So please don’t worry. 🫶", fadeIn: 1.8, hold: 2.7, fadeOut: 1.8, gap: 1.3, size: "normal", glow: "soft" },
  { text: "I’ll still love you, no matter what. ❤️", fadeIn: 2.0, hold: 3.5, fadeOut: 2.0, gap: 1.6, size: "large", glow: "strong" },

  { text: "But for now...", fadeIn: 1.8, hold: 2.0, fadeOut: 1.8, gap: 1.6, size: "normal", glow: "soft" },
  { text: "Instead of crying over me, focus on yourself too.", fadeIn: 2.0, hold: 3.5, fadeOut: 2.0, gap: 1.3, size: "small", glow: "medium" },
  { text: "I want you to succeed.", fadeIn: 2.0, hold: 3.2, fadeOut: 2.0, gap: 1.5, size: "large", glow: "strong" },
  { text: "That’s the biggest love you can give me right now. ❤️", fadeIn: 2.0, hold: 3.8, fadeOut: 2.0, gap: 1.7, size: "small", glow: "medium" },

  { text: "Because we’re still students.", fadeIn: 2.0, hold: 3.2, fadeOut: 2.0, gap: 1.7, size: "normal", glow: "soft" },
  { text: "I’ll really try my best to keep you happy.", fadeIn: 2.0, hold: 3.5, fadeOut: 2.0, gap: 2.0, size: "normal", glow: "medium" },

  { text: "I’m sorry... 🥲", fadeIn: 2.5, hold: 4.0, fadeOut: 3.0, gap: 3.0, size: "xlarge", glow: "strongest" },
];


export const continuationMessages = [
  { text: "I know I can’t fix everything with just an apology.", fadeIn: 1.8, hold: 3.2, fadeOut: 1.8, gap: 1.3, size: "small", glow: "soft" },
  { text: "But I really want to try.", fadeIn: 1.6, hold: 2.6, fadeOut: 1.6, gap: 1.2, size: "normal", glow: "soft" },
  { text: "I don’t want you thinking that I stopped caring about you.", fadeIn: 1.9, hold: 3.3, fadeOut: 1.9, gap: 1.3, size: "small", glow: "soft" },
  { text: "Because I haven’t.", fadeIn: 1.6, hold: 2.4, fadeOut: 1.6, gap: 1.1, size: "normal", glow: "soft" },
  { text: "Not even for a second.", fadeIn: 1.7, hold: 2.6, fadeOut: 1.7, gap: 1.2, size: "normal", glow: "soft" },

  { text: "Even when I can’t talk to you, you’re still important to me. ❤️", fadeIn: 2.0, hold: 3.4, fadeOut: 2.0, gap: 1.4, size: "small", glow: "medium" },
  { text: "I miss talking to you.", fadeIn: 1.7, hold: 2.7, fadeOut: 1.7, gap: 1.2, size: "normal", glow: "soft" },
  { text: "I miss being able to tell you random things.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.2, size: "small", glow: "soft" },
  { text: "I miss just having you there. 😔", fadeIn: 1.8, hold: 2.8, fadeOut: 1.8, gap: 1.3, size: "normal", glow: "soft" },

  { text: "So please don’t think my silence means I don’t care.", fadeIn: 2.0, hold: 3.4, fadeOut: 2.0, gap: 1.4, size: "small", glow: "medium" },
  { text: "Sometimes I just don’t have a choice right now.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.2, size: "small", glow: "soft" },

  { text: "But whenever I do get the chance...", fadeIn: 1.9, hold: 2.8, fadeOut: 1.9, gap: 1.4, size: "normal", glow: "soft" },
  { text: "I’ll choose to talk to you.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.3, size: "normal", glow: "medium" },
  { text: "I’ll try. I promise I’ll try. 🥲", fadeIn: 1.9, hold: 3.2, fadeOut: 1.9, gap: 1.4, size: "normal", glow: "medium" },

  { text: "And until things calm down...", fadeIn: 1.8, hold: 2.5, fadeOut: 1.8, gap: 1.3, size: "normal", glow: "soft" },
  { text: "Please take care of yourself too. 🫶", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.2, size: "normal", glow: "soft" },
  { text: "Study. Do your best.", fadeIn: 1.6, hold: 2.6, fadeOut: 1.6, gap: 1.2, size: "normal", glow: "soft" },
  { text: "And don’t forget to smile sometimes. ❤️", fadeIn: 1.9, hold: 3.2, fadeOut: 1.9, gap: 1.4, size: "normal", glow: "soft" },

  { text: "I want to see you succeed.", fadeIn: 2.0, hold: 3.2, fadeOut: 2.0, gap: 1.4, size: "normal", glow: "medium" },
  { text: "And I’ll be proud of you.", fadeIn: 1.8, hold: 3.0, fadeOut: 1.8, gap: 1.3, size: "normal", glow: "soft" },
  { text: "Even if things get difficult for both of us.", fadeIn: 1.9, hold: 3.2, fadeOut: 1.9, gap: 1.4, size: "small", glow: "soft" },

  { text: "I’m still here.", fadeIn: 2.0, hold: 3.0, fadeOut: 2.0, gap: 1.5, size: "large", glow: "strong" },
  { text: "And I’m still here for you. ❤️", fadeIn: 2.0, hold: 3.5, fadeOut: 2.0, gap: 1.6, size: "large", glow: "strong" },

  { text: "I’m sorry... 🥲", fadeIn: 2.5, hold: 4.2, fadeOut: 3.0, gap: 4.0, size: "xlarge", glow: "strongest" },
];
