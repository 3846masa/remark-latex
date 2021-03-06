import { UNIST } from 'unist';
import { MDAST } from 'mdast';
import { defaultsDeep } from 'lodash';

export default function inlineCode(node: MDAST.InlineCode) {
  const escapedValue = node.value.replace(
    /\\|[\{\}#\$%&_]|[|]|[<>^~]/g,
    str => {
      if (str === '\\') {
        return '\\textbackslash{}';
      } else if (str.match(/[\{\}#\$%&_]/)) {
        return `\\${str}`;
      } else {
        return `\\symbol{\`\\${str}}`;
      }
    }
  );
  return defaultsDeep(
    {
      value: escapedValue,
    },
    node
  ) as UNIST.Node;
}
