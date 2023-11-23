# react-use-hybrid-state

[![npm package][npm-img]][npm-url]
[![Build Status][build-img]][build-url]
[![Downloads][downloads-img]][downloads-url]
[![Issues][issues-img]][issues-url]
[![Code Coverage][codecov-img]][codecov-url]
[![Commitizen Friendly][commitizen-img]][commitizen-url]
[![Semantic Release][semantic-release-img]][semantic-release-url]

React state hook with ref, plus optional updateState,
with [1-year using,
refactor and enhancement history](https://gist.github.com/Misaka-0x447f/18cc14320abf8da37201863865df5047/revisions#diff-6eb5aa2af122281945d8d42cc285a04af319c927fec0b2e03ce47987c39985a2) in several real projects.

Jest is not working well with ESM without tweaks, so currently there is no working test.

> Dependencies: lodash-es

## Install

```bash
pnpm install react-use-hybrid-state
```

## Usage

```ts
import {useHybridState, useHybirdUpdateState} from 'react-use-hybrid-state';
import {useHybridUpdateState} from "./index";

// ...

const [state, setState, stateRef] = useHybridState(/* initial value */)
const [state, updateState, stateRef, setState] = useHybridUpdateState(/* initial value */)

//=> 'hello from my package'
```
