/**
 * @fileoverview 每个组件中最多出现一个h1
 * @author yantaomeng
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/only-h1"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester(  {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
});
ruleTester.run("only-h1", rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><h2></h2></template>'
    },
    {
      filename: 'test.vue',
      code: '<template><h1></h1></template>'
    },
    // comment value
    {
      filename: 'comment-value.vue',
      code: `<template>
          <div>
          <!-- <h1></h1> -->
          <div>
        </template>`,
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><h1></h1><h1></h1></template>',
      errors: ["每个组件中最多出现一个h1标签"]
    },
    {
      filename: 'test.vue',
      code: '<template><h1>hello<h1>world</h1>!</h1></template>',
      errors: ["每个组件中最多出现一个h1标签"]
    },
    // empty value
    {
      filename: 'comment-value.vue',
      code: '<template><h1>hello</h1><h1>world</h1></template>',
      errors: ["每个组件中最多出现一个h1标签"]
    }
  ]
});
