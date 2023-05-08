/**
 * @fileoverview 每个组件中最多出现一个h1
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
      description: "每个组件中最多出现一个h1标签",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages:{
      onlyH1:"每个组件中最多出现一个h1标签"
    }
  },

  create(context) {
    let tagNumber=0;
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='h1']"(node) {
        if(tagNumber===0){
          tagNumber++
        }else{
          context.report({
            node,
            messageId: 'onlyH1'
          })
        }
      }
    })
  },
};
