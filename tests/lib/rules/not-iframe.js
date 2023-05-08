/**
 * @fileoverview 不允许出现iframe标签
 * @author yantaomeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/not-iframe"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(
  {
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2015 }
  }
);
ruleTester.run("not-iframe", rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><div></div></template>'
    },
    // comment value
    {
      filename: 'comment-value.vue',
      code: `<template>
          <div>
          <!-- <iframe></iframe> -->
          <div>
        </template>`,
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><iframe src="></iframe></template>',
      errors: ["请不要在代码中出现iframe标签"]
    },
    // empty value
    {
      filename: 'comment-value.vue',
      code: '<template><iframe src="/></template>',
      errors: ["请不要在代码中出现iframe标签"]
    }
  ]
});
