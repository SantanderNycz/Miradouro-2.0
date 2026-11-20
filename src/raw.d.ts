// Importação de ficheiros .txt como texto (webpack: test /\.txt$/ → asset/source).
declare module "*.txt" {
  const content: string;
  export default content;
}
