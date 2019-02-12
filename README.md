# Jacob's Text Magic
A simple assembly language. I built this for ECE3242 (Computer Architecture) where we often have to write and insert binary into memory manually.

## Usage
Visit the [website](https://jacobsmith.me/converter) and start typing. Use Ctrl+S to convert from assembly -> binary.

## Instruction Set:
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
 OP  Ra   Rb   Rc
 OP  Ra   IMM  IMM
 OP  --   IMM  IMM
```

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
