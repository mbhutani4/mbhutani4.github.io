export default function openExternalLink(
  url: string,
  target: string = "_blank"
) {
  window.open(url, target);
}
