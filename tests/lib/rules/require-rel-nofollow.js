/**
 * @fileoverview 跳转到站外的链接时，应该添加rel=&#34;nofollow&#34;
 * @author yantaomeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/require-rel-nofollow"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const BaseOrigin='https://www.baidu.com/'
const ruleTester = new RuleTester( {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
});
let ValidOptions=[
  {
    filename: 'test.vue',
    code: ''
  },
  {
    filename: 'test.vue',
    code: '<template><a></a></template>',
  },
  {
    filename: 'test.vue',
    code: '<template><a rel="noopener"></a></template>'
  },
  {
    filename: 'test.vue',
    code: '<template><a href="https://www.baidu.com/" rel="noopener"></a></template>'
  },
  {
    filename: 'test.vue',
    code: '<template><a href="https://www.google.com/index" rel="nofollow"></a></template>'
  },
  {
    filename: 'test.vue',
    code: '<template><a href="https://google.com/index" rel="nofollow noopener"></a></template>'
  },
]
let InvalidOptions=[
  {
    filename: 'test.vue',
    code: '<template><a href="https://google.com/index"></a></template>',
    output: `<template><a href="https://google.com/index" rel='nofollow'></a></template>`
  },
  {
    filename: 'test.vue',
    code: '<template><a href="https://google.com/index" rel="noopener"></a></template>',
    output:'<template><a href="https://google.com/index" rel="noopener nofollow" ></a></template>'
  },
]
ValidOptions=ValidOptions.map(item=>{
    return{
      ...item,
      options:[{origin:BaseOrigin}]
    }
})
InvalidOptions=InvalidOptions.map(item=>{
  return {
      ...item,
      options:[{origin:BaseOrigin}],
      errors:["跳转到站外的链接时，应该添加rel='nofollow'"]
  }
})
ruleTester.run("require-rel-nofollow", rule, {
  valid: [
    ...ValidOptions,
    {
        filename: 'comment-value.vue',
        code: `<template>
            <div>
              <a href="https://www.google.com/index"></a>
            <div>
          </template>`,
      },
      {
        filename: 'test.vue',
        code: '<template><a href="https://google.com/index" rel="noopener"></a></template>'
    }
  ],
  invalid:InvalidOptions,
});
