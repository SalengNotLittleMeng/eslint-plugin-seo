/**
 * @fileoverview 不允许出现iframe标签
 * @author yantaomeng
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
const utils=require('../utils')
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "不允许出现iframe标签",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      unexpectedIframe: "请不要在代码中出现iframe标签",
    }
  },

  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='iframe']"(node) {
          context.report({
            node,
            messageId: 'unexpectedIframe'
          })
      }
    })
  },
};
