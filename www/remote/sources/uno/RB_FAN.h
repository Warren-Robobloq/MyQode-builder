#ifndef RB_FAN_H
#define RB_FAN_H

 
 
#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "RB_PORT.h" 




class RB_FAN:public RB_Port
{
	
public:	
    RB_FAN(uint8_t pwm1_pin,uint8_t pwm2_pin);
	RB_FAN(uint8_t port);
	void RB_FAN_INIT(void);
	void RB_FAN_SET(uint8_t Speed,uint8_t Dir);
    
private :
   uint8_t _PWM1_pin;
   uint8_t _PWM2_pin;
};
 


#endif

