#ifndef RB_LINEPOTENTIOMETER_H
#define RB_LINEPOTENTIOMETER_H


#include <stdint.h>
#include <stdbool.h>
#include <Arduino.h>

#include "RB_PORT.h" 


class RB_LINEPOTENTIOMETER:public RB_Port
{
	public:
	              RB_LINEPOTENTIOMETER(void);
	              RB_LINEPOTENTIOMETER(uint8_t port);
         void     SetPin(uint8_t sigpin);
	     uint16_t GetLinePotentiometer(void); 
		 uint16_t GetLinePotentiometerValue(void);

 private:
         uint8_t  _SigPin;
};


#endif
