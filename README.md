# Jacob's Text Magic
A simple assembly language. I built this for ECE3242 (Computer Architecture) where we often have to write and insert binary into memory manually. By creating this program, I was able to write the program in assembly and compile to the expected binary format.

## Usage
Visit the [website](https://jacobsmith.me/converter) and start typing. Use `Ctrl+S` to convert from assembly -> binary.

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

#### mov3
```
mov3 Ra Rb
MEM[REG[Ra]] <= REG[Rb]
```

#### mov4
```
mov4 Ra IMM
REG[Ra] <= IMM
```

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

#### subt
```
subt Ra Rb Rc
REG[Ra] <= REG[Rb] - REG[Rc]
```

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
0011 0000 0000 0000
OP   Ra   Rb   Rc
OP   Ra   IMM  IMM
OP   --   IMM  IMM
```

## FAQ
> Are there comments?

Yes, you can use `#` to tell the compiler to ignore the rest of the line.

## Project setup
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
