#include "RB_JOYSTICK.h"



volatile int16_t RB_JOYSTICK::_X_offset = 0;
volatile int16_t RB_JOYSTICK::_Y_offset = 0;

/*

*/

RB_JOYSTICK::RB_JOYSTICK(void)
{
	
	
	
}

RB_JOYSTICK::RB_JOYSTICK(uint8_t port):RB_Port(port)
{
	_SigPin_X  =  RBPort[port].dat;
	_SigPin_Y  =  RBPort[port].clk;
	
}

void RB_JOYSTICK::SetPin(uint8_t sigpin_x,uint8_t sigpin_y)
{
    _SigPin_X   = sigpin_x;
	_SigPin_Y   = sigpin_y;
}


int16_t RB_JOYSTICK::ReadJoystickX(void)
{
	
	int16_t  x_value = 0;
	pinMode(_SigPin_X,INPUT);
	x_value = analogRead(_SigPin_X);
	
	x_value = (x_value-CENTER_VALUE_X);
	if(x_value > 0 ) x_value = x_value*(11)/6;
	else             x_value = x_value*(7)/10;
	
	x_value  = x_value + _X_offset;
	if(x_value>480)x_value = 480;
	else if(x_value<(-480))x_value=-480;
	else if(((-50)<x_value)&&(x_value<50))x_value = 0;
	return x_value;
		
}

int16_t RB_JOYSTICK::ReadJoystickY(void)
{
	
	int16_t  y_value = 0;
	pinMode(_SigPin_Y,INPUT);
	y_value = analogRead(_SigPin_Y);
	y_value = (y_value-CENTER_VALUE_Y);
	if(y_value > 0 ) y_value = y_value*(-11)/6;
	else             y_value = y_value*(-7)/10;
	
	y_value  = y_value + _Y_offset;
	
	if(y_value>480)y_value = 480;
	else if(y_value<(-480))y_value=-480;
	else if(((-50)<y_value)&&(y_value<50))y_value = 0;
	return y_value;
		
}



int16_t RB_JOYSTICK::CalCenterValue(int16_t x_offset,int16_t y_offset)
{
	_X_offset = x_offset;
	_Y_offset = y_offset;	
}


float RB_JOYSTICK::OffCenter(void)
{
  long dx   = abs(ReadJoystickX());
  long dy   = abs(ReadJoystickY());
  long dist = dx * dx + dy * dy;
  return(min(CENTER_VALUE*sqrt(2), sqrt(dist)));
}
