/*
*
*
*
*
*
*/

#include "RB_FAN.h"







RB_FAN::RB_FAN(uint8_t pwm1_pin,uint8_t pwm2_pin)
{
	
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
   pinMode(20,OUTPUT);
   digitalWrite(MOTOR_Charge_Pin,HIGH);  
   _PWM1_pin  = pwm1_pin;
   _PWM2_pin  = pwm2_pin;
    pinMode(_PWM1_pin,OUTPUT);
    pinMode(_PWM2_pin,OUTPUT);
#else 
	_PWM1_pin  = pwm1_pin;
    _PWM2_pin  = pwm2_pin;
	pinMode(_PWM1_pin,OUTPUT);
    pinMode(_PWM2_pin,OUTPUT);
#endif
     
	
}

RB_FAN::RB_FAN(uint8_t port): RB_Port(port)
{  
#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)     
   pinMode(20,OUTPUT);
   digitalWrite(MOTOR_Charge_Pin,HIGH);  
   _PWM1_pin = RBPort[port].clk;
   _PWM2_pin = RBPort[port].dat;
   pinMode(_PWM1_pin,OUTPUT);
   pinMode(_PWM2_pin,OUTPUT);
#else
    _PWM1_pin = RBPort[port].clk;
	_PWM2_pin = RBPort[port].dat;
	pinMode(_PWM1_pin,OUTPUT);
    pinMode(_PWM2_pin,OUTPUT);
#endif	
}

void RB_FAN::RB_FAN_INIT(void)
{   

#if defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)  	
	
#else
    
	pinMode(_PWM1_pin,OUTPUT);
    pinMode(_PWM2_pin,OUTPUT);
#endif	
	
	
}
void RB_FAN::RB_FAN_SET(uint8_t Speed,uint8_t Dir)
{    
  
      Speed = constrain(Speed,0,255); 
	  Speed = 255 - Speed;
      if(Dir == 0) {
         
           pinMode(_PWM1_pin, OUTPUT); 
           pinMode(_PWM2_pin, INPUT);  
          analogWrite(_PWM1_pin,Speed);
       }  
      else {
		   pinMode(_PWM2_pin, OUTPUT); 
           pinMode(_PWM1_pin, INPUT);  
		   analogWrite(_PWM2_pin,Speed);
       }
     
}   



