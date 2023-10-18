import { memo } from "react"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function formatXml(xml: any) {
  // https://stackoverflow.com/questions/57039218/doesnt-monaco-editor-support-xml-language-by-default
  const PADDING = ' '.repeat(2);
  const reg = /(>)(<)(\/*)/g;
  let pad = 0;

  xml = xml.replace(reg, '$1\r\n$2$3');

  return xml.split('\r\n').map((node: any, index: number) => {
    let indent = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indent = 0;
    } else if (node.match(/^<\/\w/) && pad > 0) {
      pad -= 1;
    } else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
      indent = 1;
    } else {
      indent = 0;
    }

    pad += indent;

    return PADDING.repeat(pad - indent) + node;
  }).join('\r\n');
}
export const XmlEditor = memo((
  props: {
    value?: string,
    onChange?: (value?: string) => void,
  }
) => {
  const { value, onChange } = props;

  return (
    // <MonacoInput
    //   className="gql-input-area"
    //   options={{
    //     readOnly: false,
    //     lineDecorationsWidth: 0,
    //     lineNumbersMinChars: 0,
    //     minimap: {
    //       enabled: false,
    //     }
    //   }}
    //   language="xml"
    //   value={value}
    //   onChange={onChange}
    // />
    <></>
  )
})