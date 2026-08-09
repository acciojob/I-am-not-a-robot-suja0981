const container = document.getElementById("imageContainer");
const heading = document.getElementById("h");
const para = document.getElementById("para");
const reset = document.getElementById("reset");
const verify = document.getElementById("verify");

const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

let selectedImages = [];

// Correct Fisher-Yates shuffle
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

// Create 6 images with one randomly selected duplicate
function createImages() {
  container.innerHTML = "";

  // Randomly choose one of the 5 image classes to duplicate
  const randomIndex = Math.floor(Math.random() * imageClasses.length);
  const duplicate = imageClasses[randomIndex];

  // Five unique images + one randomly selected duplicate
  const images = [...imageClasses, duplicate];

  // Shuffle all six images
  shuffle(images);

  images.forEach(function (className) {
    const img = document.createElement("img");

    img.classList.add(className);
    img.addEventListener("click", selectImage);

    container.appendChild(img);
  });
}

// Select an image
function selectImage(event) {
  const clickedImage = event.target;

  if (selectedImages.includes(clickedImage)) {
    return;
  }

  selectedImages.push(clickedImage);
  clickedImage.classList.add("selected");

  reset.style.display = "inline-block";

  if (selectedImages.length === 2) {
    verify.style.display = "inline-block";
  } else {
    verify.style.display = "none";
  }
}

// Reset
reset.addEventListener("click", function () {
  selectedImages.forEach(function (image) {
    image.classList.remove("selected");
  });

  selectedImages = [];

  reset.style.display = "none";
  verify.style.display = "none";

  para.textContent = "";

  heading.textContent =
    "Please click on the identical tiles to verify that you are not a robot.";
});

// Verify
verify.addEventListener("click", function () {
  if (selectedImages.length !== 2) {
    return;
  }

  const firstImage = selectedImages[0];
  const secondImage = selectedImages[1];

  if (firstImage.className === secondImage.className) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verify.style.display = "none";
});

// Initial state
reset.style.display = "none";
verify.style.display = "none";

createImages();