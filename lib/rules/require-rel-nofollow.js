/**
 * @fileoverview 跳转到站外的链接时，应该添加rel="nofollow"
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
      description: "跳转到站外的链接时，应该添加rel='nofollow'",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [{ origin:{
      type:"string"|"array"
    } }], // Add a schema if the rule has options
    messages:{
      expectedRelNofollow:"跳转到站外的链接时，应该添加rel='nofollow'",
      expectedRel:"跳转到站外的链接时，应该添加rel='nofollow'",
    }
  },

  create(context) {
    const [argv]=context.options;
    let origin=argv?argv.origin:''
    // 将传入的数组或字符串参数统一转为数组参数
    if(!Array.isArray(origin)){
      origin=[origin]
    }
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='a']"(node) {
          if(!origin){return}
          const attrsList=node.startTag&&node.startTag.attributes ||[]
          const relAttr= attrsList.find(attr => {
              return attr.key.name==='rel'
          });
          const hrefAttr=attrsList.find(attr=>{
              return attr.key.name==='href'
          })
          if(!hrefAttr){return}
          const hrefAttrValue=hrefAttr.value.value
          // 两种情况直接返回：1.href的值为空，2.href的值在参数设置的站内白名单内
          if(!hrefAttrValue||origin.some(item=>{
            return  hrefAttrValue.indexOf(item)!=-1
          })){
            return
          }
          if(relAttr){
            // 存在rel属性
              const relValue=relAttr.value.value
              const relValueList=relValue.split(' ').map(item=>item.trim())
              // 没有nofllow这个值
              if(!relValueList.includes('nofollow')){
                const content=` rel="${relValue} nofollow"`
                context.report({
                  node,
                  messageId: 'expectedRelNofollow',
                  fix(fixer){
                    return [
                      fixer.remove(relAttr),
                      fixer.insertTextAfter(hrefAttr , content)
                    ]
              }
                })
              }
          }else{
            // 不存在rel属性 
            context.report({
              node,
              messageId: 'expectedRel',
              fix(fixer){
                    return [
                      fixer.insertTextAfter(hrefAttr , " rel='nofollow'")
                    ]
              }
            })
          }
      }
    })
  },
};
