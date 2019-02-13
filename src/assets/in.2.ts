export default `
#define ONE R0
set ONE 1

#define BASE R1
#define COUNT R2
#define ADDR R3

set BASE 50
set COUNT 200
add ADDR BASE COUNT
save ADDR COUNT
subt COUNT COUNT ONE
jz COUNT 3

set R1 50 # countA
set R2 150 # countB
set R3 100 # count

load R4 R1 # dataA = MEM[countA]
load R5 R2 # dataB = MEM[countB]
subt R4 R5 R4 # dataA = dataB - dataA
save R1 R4 # MEM[countA] = dataA

add R1 R1 R0
add R2 R2 R0
subt R3 R3 R0
jz R3 10

readm 50
readm 51
readm 60
readm 70
readm 80

halt
`;
