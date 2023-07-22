<template>
  <div>
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1300 250"
      width="1300" height="250"
    >
      <defs>
        <clipPath id="clip-path">
          <rect class="cls-1" width="1300" height="250" />
        </clipPath>
        <radialGradient
          id="radial-gradient"
          cx="650"
          cy="125"
          r="468.04"
          gradientTransform="translate(0 87.5) scale(1 0.3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#262223" stop-opacity="0.5" />
          <stop offset="0.97" stop-color="#020202" stop-opacity="0.8" />
        </radialGradient>
        <radialGradient
          id="radial-gradient-2"
          cx="650"
          cy="125"
          r="468.04"
          gradientTransform="translate(0 87.5) scale(1 0.3)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#007c95" stop-opacity="0.3" />
          <stop offset="0.97" stop-color="#007c95" stop-opacity="0.3" />
        </radialGradient>
      </defs>
      <title>output-desing</title>
      <g id="bg_image">
        <g style="clip-path: url(#clip-path);">
          <image
            width="5479"
            height="1589"
            transform="translate(-7.04 -30.4) scale(0.24)"
            xlink:href="./output-desing1.jpg"
          />
        </g>
        <g class="cls-3">
          <rect style="fill: url(#radial-gradient);" width="1300" height="250" />
          <rect style="fill: url(#radial-gradient-2);" width="1300" height="250" />
        </g>
      </g>
      <g mask="url(#mg-image-mask)">
        <g style="clip-path: url(#clip-path);" id="colored_image">
          <image
            width="5479"
            height="1589"
            transform="translate(-7.04 -30.4) scale(0.24)"
            xlink:href="./output-desing2.jpg"
          />
        </g>
      </g>
      <mask id="mg-image-mask">
        <rect class="cls-6" width="1300" height="250" />
        <circle
          id="circle_mask"
          class="cls-7"
          cx="289.05"
          cy="137.38"
          r="59.43"
        />
      </mask>
      <g id="magnifier">
        <image
          width="1180"
          height="1210"
          transform="translate(204.86 67.34) scale(0.24)"
          xlink:href="./output-desing3.png"
        />
      </g>
    </svg>
  </div>
</template>
<style>
.cls-1 {
  fill: none;
}

.cls-3 {
  opacity: 0.7;
}

.cls-6 {
  fill: #000;
}

.cls-7 {
  fill: #fff;
}
#circle_mask,
#magnifier {
  transform: translate(0px, 0px);
  animation: moveMagnifier 6s ease 0s infinite forwards;
}
@keyframes moveMagnifier {
  0% {
    transform: translate(-80px, 0px);
  }
  25% {
    transform: translate(-130px, 30px);
  }
  50% {
    transform: translate(-180px, 0px);
  }
  75% {
    transform: translate(-130px, -30px);
  }
  100% {
    transform: translate(-80px, 0px);
  }
}
</style>
