//your code here
const container = document.getElementById("imageContainer");
const heading = document.getElementById("h");
const para = document.getElementById("para");
const reset = document.getElementById("reset");
const verify = document.getElementById("verify");

const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

let selectedImages = [];

function shuffle(){
	for(let i=arr.lentgh-1;i>0;i--){
		const j=Math.floor(Math.random()*(i+1));

	[array[i],array[j]]=[array[j],array[i]];
		
	}
	return array;
}
function createImages(){
	container.InnerHtml="";

	const duplicateIndex=Math.floor(Math.random()*imageClasses.length);

	const duplicate=imageClasses[duplicateIndex];

	const images=[...imageClasses,duplicate];

	shuffle(images);

	images.forEach(function (className){
		
	const img = document.createElement("img");

    img.classList.add(className);

    img.addEventListener("click", selectImage);

    container.appendChild(img);
  });
}
// Handle image selection
function selectImage(event) {
  const clickedImage = event.target;

  // Prevent selecting the same tile twice
  if (selectedImages.includes(clickedImage)) {
    return;
  }

  selectedImages.push(clickedImage);
  clickedImage.classList.add("selected");

  // At least one image selected
  reset.style.display = "inline-block";

  // Verify appears ONLY when exactly 2 images are selected
  if (selectedImages.length === 2) {
    verify.style.display = "inline-block";
  } else {
    verify.style.display = "none";
  }
}


// Reset button
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
// Verify button
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

  // Hide Verify after clicking it
  verify.style.display = "none";
});

//Initial state

reset.style.display="none";
verify.style.display="none";
para.style.display="";
createImages();