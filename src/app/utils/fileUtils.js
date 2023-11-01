export function readFileFromInput(event, onReadFile) {
  if (event.target.files) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onReadFile(reader.result?.toString() || '');
    };
  }
}
