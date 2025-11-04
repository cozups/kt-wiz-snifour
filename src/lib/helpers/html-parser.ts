import { createElement } from "react";
import DOMPurify from "dompurify";

export const htmlToNode = (htmlText: string) => {
  const cleanHTML = DOMPurify.sanitize(htmlText);
  const parser = new DOMParser();
  const nodesToParse = parser.parseFromString(cleanHTML, "text/html").body.childNodes;

  const parseNode = (node: Element) => {
    // 텍스트 노드인 경우 텍스트 반환
    switch (node.nodeType) {
      case Node.TEXT_NODE:
        return node.textContent;
      case Node.ELEMENT_NODE: {
        const { tagName, attributes, childNodes } = node;
        const props: React.HTMLAttributes<HTMLElement> = {};
        const tag = tagName.toLowerCase();

        // attribute를 props로 복사 (style은 제외)
        for (const attr of attributes) {
          if (tag === "font") {
            continue;
          }
          if (attr.name === "style" || attr.name === "class") {
            continue;
          }
          props[attr.name as keyof React.HTMLAttributes<HTMLElement>] = attr.value;
        }

        // 자식 노드 parse
        const children: (string | null | React.ReactNode)[] = Array.from(childNodes).map((childNode) =>
          childNode.nodeType === Node.ELEMENT_NODE ? parseNode(childNode as Element) : childNode.textContent
        );

        return createElement(
          tag === "font" ? "span" : tag,
          {
            ...props,
            key: Math.random(),
            className: tagName === "IMG" && "mx-auto",
          },
          ...children
        );
      }
      default:
        return null; // 다른 노드 유형은 처리하지 않음
    }
  };

  return Array.from(nodesToParse).map((node) => parseNode(node as Element));
};
