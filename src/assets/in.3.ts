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

# redefine variables for second loop :)
#define ADDR_A R1
#define ADDR_B R2
#define COUNT R3
#define DATA_A R4
#define DATA_B R5
#define RES R5

set ADDR_A 50
set ADDR_B 150
set COUNT 100

load DATA_A ADDR_A
load DATA_B ADDR_B
subt DATA_A DATA_B DATA_A
save ADDR_A R4 # MEM[countA] = dataA

add ADDR_A ADDR_A ONE
add ADDR_B ADDR_B ONE
subt COUNT COUNT ONE
jz COUNT 10

readm 50
readm 51
readm 60
readm 70
readm 80

halt
`;
