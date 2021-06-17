<template>
  <div
    id="loader"
    class="flex w-full h-full fixed block top-0 left-0 bg-white opacity-95 z-50"
  >
    <div class="m-auto block h-28 w-56 align-middle">
      <div
        id="loader-circle"
        class="ease-linear rounded-full ml-16 mb-8 border-8 border-t-8 border-gray-900 h-28 w-28"
      ></div>
      <h2 class="quote">{{ quote }}</h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "SwoleLoader",
  setup() {
    const quotes = [
      "No guts, no story. Chris Brady",
      "My life is my message. Mahatma Gandhi",
      "Screw it, let’s do it. Richard Branson",
      "Boldness be my friend. William Shakespeare",
      "Keep going. Be all in. Bryan Hutchinson",
      "My life is my argument. Albert Schweitzer",
      "Fight till the last gasp. William Shakespeare",
      "Stay hungry. Stay foolish. Steve Jobs",
      "You can if you think you can. George Reeves",
      "Whatever you are, be a good one. Abraham Lincoln",
      "Impossible is for the unwilling. John Keats",
      "The wisest mind has something yet to learn. George Santanaya",
      "The past does not equal the future. Tony Robbins",
      "Good things happen to those who hustle. Anaïs Nin",
      "If it matters to you, you’ll find a way. Charlie Gilkey",
      "Forget about style; worry about results. Bobby Orr",
      "Every noble work is at first impossible. Thomas Carlyle",
      "If you’re going through hell, keep going. Winston Churchill",
      "Open your mind. Get up off the couch. Move. Anthony Bourdain",
      "Be faithful to that which exists within yourself. André Gide",
      "Persistence guarantees that results are inevitable. Paramahansa Yogananda",
      "In life you need either inspiration or desperation. Tony Robbins",
      "I would rather die on my feet than live on my knees. Euripides",
      "The true success is the person who invented himself. Al Goldstein",
      "Let him that would move the world first move himself. Socrates",
      "Go forth on your path, as it exists only through your walking. Augustine of Hippo",
      "We can do anything we want to if we stick to it long enough. Helen Keller",
      "It does not matter how slowly you go as long as you do not stop. Confucius",
      "It is better to live one day as a lion, than a thousand days as a lamb. Roman proverb",
      "Life is fragile. We’re not guaranteed a tomorrow so give it everything you’ve got. Tim Cook",
      "The two most important days in your life are the day you are born and they day you find out why. Mark Twain",
    ];

    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    return {
      quote,
    };
  },
};
</script>
<style>
#loader-circle {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
