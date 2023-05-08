/**
 * @fileoverview 希望图片的alt属性不为空
 * @author yantaomeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/require-img-alt"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(  {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
});
ruleTester.run("require-img-alt", rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><div><img alt="123"/></div></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><div></div></template>'
    },
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div><img/></div></template>',
      errors: ["期望图片标签拥有alt属性"]
    },
    // empty value
    {
      filename: 'comment-value.vue',
      code: '<template><div><img alt=""/></div></template>',
      errors: ["期望图片的alt属性不为空"]
    }
  ],
});
