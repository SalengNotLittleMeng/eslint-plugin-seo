/**
 * @fileoverview 期望图片的alt属性不为空
 * @author yantaomeng
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const utils=require('../utils')
/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "期望图片的alt属性不为空",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages:{
      noImageAlt: "期望图片标签拥有alt属性",
      unExpectedImageAltIsEmpty:'期望图片的alt属性不为空'
    }
  },

  create(context) {
      return utils.defineTemplateBodyVisitor(context, {
        "VElement[name='img']"(node) {
          if(node.startTag){
            const attrsList=node.startTag.attributes||[]
          const altAttr= attrsList.find(attr => {
               return attr.key.name=='alt'
            });
            if(!altAttr){
              context.report({
                node,
                messageId: 'noImageAlt'
              })
            }else{
              if(!altAttr.value.value){
                context.report({
                  node,
                  loc: {
                    start: altAttr.value.loc.start,
                    end: altAttr.value.loc.end
                  },
                  messageId: 'unExpectedImageAltIsEmpty'
                })
              }
            }
          }
        }
      })
  },
};
