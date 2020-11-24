//Day2

let PALETTE = [
  "#C0392B",
  "#2E86C1",
  "#7D3C98",
  "#229954",
  "#F1C40F",
  "#979A9A",
  "#2C3E50",
];
let mouseIsDown = false;

function makePalette(color) {
  if (!color && $(".palette").is(":empty")) {
    for (let index = 0; index < PALETTE.length; index = index + 1) {
      // access the color
      const nextColor = PALETTE[index];

      $(".palette").append(
        $("<button/>").css({
          "background-color": nextColor,
        })
      );
    }
    $(".palette button").first().addClass("active");
  }

  if (color && PALETTE.includes(color) === false) {
    let nextColor = color;
    $(".palette").append(
      $("<button/>").css({
        "background-color": nextColor,
      })
    );
    $(".palette button").removeClass("active");
    $(".palette button").last().addClass("active");
    PALETTE.push(nextColor);
  } else if (color && PALETTE.includes(color) === true) {
    alert(
      "Selected color " + color + " already in Palette. Pick a New Color !"
    );
  }
}

function makeGrid(rows, cols) {
  if (rows && cols) {
    //Add additional two pixels to accomodate the border length
    $(".grid").css({ height: 64 * rows + 2, width: 64 * cols + 2 });
    for (let index = 0; index < rows * cols; index = index + 1) {
      $(".grid").append($("<div/>").addClass("cell"));
    }
  } else {
    for (let index = 0; index < 64; index = index + 1) {
      $(".grid").append($("<div/>").addClass("cell"));
    }
  }
}

function onPaletteClick() {
  $(".active").removeClass("active");
  $($(this).addClass("active"));
}

function onGridClick() {
  if (
    $(this).css("background-color") === $(".active").css("background-color")
  ) {
    $(this).css({ "background-color": "rgba(0, 0, 0, 0)" });
  } else {
    // By calling this in here you're not adding the event handlers until a cell is clicked.
    // This should be called outside of this function.
    colorMoreThanOne();
    $(this).css("background-color", $(".active").css("background-color"));
  }
}

function onClearClick() {
  $(".grid .cell").css("background-color", "");
}

function onFillAllClick() {
  $(".grid .cell").css({
    "background-color": $(".active").css("background-color"),
  });
}

function onFillEmptyClick() {
  const elements = $(".grid .cell");
  const activeColor = $(".active").css("backgroundColor");

  for (let index = 0; index < elements.length; index = index + 1) {
    let nextElement = $(elements[index]);
    if (nextElement.css("background-color") === "rgba(0, 0, 0, 0)") {
      $(
        nextElement.css({
          "background-color": $(".active").css("background-color"),
        })
      );
    }
  }
}

//STRETCH

$("#color-picker")
  .spectrum({
    type: "color",
    showInput: "false",
    showInitial: "true",
    showButtons: "false",
    preferredFormat: "name",
  })
  .on("change.spectrum", function (e, color) {
    makePalette($("#color-picker").val());
    $("#color-picker").spectrum("set", "");
  })
  .css({ color: "10px" });

// Color More than One
function colorMoreThanOne() {
  $(".cell").mousedown(function () {
    mouseIsDown = true;
  });

  $(".cell").mouseup(function () {
    mouseIsDown = false;
  });

  $(".cell").mouseenter(function () {
    if (mouseIsDown)
      $(this).css("background-color", $(".active").css("background-color"));
  });
}

// Custom Grid Size

function onCreateGridClick() {
  let valueRows = $("#numRows").val();
  let valueCols = $("#numCols").val();

  if (valueRows <= 0) {
    alert("Please choose a Positive Number Greater Than Zero for Rows");
  } else if (valueCols <= 0) {
    alert("Please choose a Positive Number Greater Than Zero for Columns");
  } else {
    $(".grid").html("");
    makeGrid(valueRows, valueCols);
    $(".grid .cell").click(onGridClick);
    $(".controls .clear").click(onClearClick);
    $(".controls .fill-all").click(onFillAllClick);
    $(".controls .fill-empty").click(onFillEmptyClick);
    $(".controls .create-grid").click(onCreateGridClick);
  }
}

makePalette();
makeGrid();
$(".palette button").click(onPaletteClick);
$(".grid .cell").click(onGridClick);
$(".controls .clear").click(onClearClick);
$(".controls .fill-all").click(onFillAllClick);
$(".controls .fill-empty").click(onFillEmptyClick);
$(".controls .create-grid").click(onCreateGridClick);
