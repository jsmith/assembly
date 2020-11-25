# Jacob's Text Magic
A simple assembly language built for ECE3242 (Computer Architecture). We often had to write and insert binary into memory manually (see [here](https://github.com/jsmith/set-associative-cache/blob/880d9868ce18cff4e11e5c2b4c03660739c4faa4/memory.vhd#L37)). Furthermore, compilation and simulation took upwards of 10 minutes. By creating this program, I was able to write the program in assembly, simulate the behavior using the builtin emulator, and compile the program to the expected binary format.

## Usage
Visit the [website](https://jsmith.github.io/assembly) and start typing. Use `Ctrl+S` to convert from assembly -> binary.

## Examples
#### Simple Addition
Initialize a register and double the value [[link](https://jsmith.github.io/assembly/#/?text=set%20R1%201%0Aadd%20R1%20R1%20R1%0Ahalt)].

#### Using Memory
Store a value to memory and read it in the debug line [[link](http://jsmith.github.io/assembly/#/?text=set%20R1%2055%0Amov2%20R1%200%0Areadm%200%0Ahalt)].

#### Looping
Here is a simple for loop that counts down from 10 to 1 and stop looping at 0 [[link](https://jsmith.github.io/assembly/#/?text=%23define%20ONE%20R0%0A%23define%20COUNT%20R1%0A%23define%20TEMP%20R2%0Aset%20ONE%201%0Aset%20COUNT%2010%0A%0Asave%20COUNT%20COUNT%20%23%20store%20COUNT%20in%20address%20COUNT%0Asubt%20COUNT%20COUNT%20ONE%0A%0A%23%20Since%20our%20only%20instruction%20for%20control%20flow%20is%20jz,%20it%27s%20very%20awkward%20to%20break%20out%20of%20loops%0Amov1%20TEMP%201%20%23%20TEMP%20%3D%20MEM%5B1%5D%0Ajz%20TEMP%202%0A%0Areadm%201%0Areadm%202%0Areadm%203%0Areadm%204%0Areadm%205%0Areadm%206%0Areadm%207%0Areadm%208%0Areadm%209%0Areadm%2010%0A%0Ahalt)].

#### Labels
A loop that never ends, using a label [[link](https://jsmith.github.io/assembly/#/?text=%23%20dummy%20instruction%0Aadd%20R1%20R1%20R1%0A%0Aloop%3A%0A%20%20%20%20jz%20R1%20loop%0A)].


## Instruction Set
The following instruction sections include the specific format that each format expects and a technical description.

#### mov1
```
mov1 Ra IMM
REG[Ra] <= MEM[IMM]
```

#### mov2
```
mov2 Ra IMM
MEM[IMM] <= REG[Ra]
```

#### save
```
save Ra Rb
MEM[REG[Ra]] <= REG[Rb]
```
> Previously `mov3`

#### set
```
set Ra IMM
REG[Ra] <= IMM
```
> Previously `mov4`

#### load
```
load Ra Rb
REG[Ra] <= MEM[REG[Rb]]
```

#### add
```
add Ra Rb Rc
REG[Ra] <= REG[Rb] + REG[Rc]
```
> Previously there were only two registers (`add Ra Rb`)

#### subt
```
subt Ra Rb Rc
REG[Ra] <= REG[Rb] - REG[Rc]
```
> Previously there were only two registers (`subt Ra Rb`)

#### jz
```
jz Ra IMM
jump to IMM if REG[Ra] == 0
```

#### readm
```
readm IMM
out <= MEM[IMM]
```

#### halt
```
halt
halts program
```


## Instruction Formats
Here is a list of the various instruction formats that could occur.
```
0000 0000 0000 0000
OP   Ra   Rb   Rc
OP   Ra   IMM  IMM
OP   --   IMM  IMM
```

## FAQ
> Are there comments?

Yes, you can use `#` to tell the compiler to ignore the rest of the line.

> Are there labels?

Yes, you can use `<LABEL>:` to tell the compiler to attach `<LABEL>` to the following line number.

> Are there variables?

Yes, you can use `#define XX XX` to define a variable. For example, `#define A B` tells the compiler to replace all occurrences of `A` with `B`.

## Project setup
Want to run the website locally? Just use the following commands :)
```
# install the deps
npm i

# run the dev server
npm run serve

# build the project -> docs/
npm run build

# run the tests
npm run test:unit
```
