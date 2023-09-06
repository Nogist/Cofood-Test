export function getFileType(fileName) {
  const extension = fileName.split(".").pop().toLowerCase();

  if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "gif"
  ) {
    return "image";
  } else if (
    extension === "pdf" ||
    extension === "svg" ||
    extension === "txt"
  ) {
    return "pdf";
  } else if (extension === "xlsx" || extension === "xls") {
    return "excel";
  } else {
    // Handle other file types as needed
    return "other";
  }
}
