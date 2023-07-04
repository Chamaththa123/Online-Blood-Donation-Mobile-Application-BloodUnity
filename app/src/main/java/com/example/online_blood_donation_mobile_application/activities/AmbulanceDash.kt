package com.example.online_blood_donation_mobile_application.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.ImageView
import com.example.online_blood_donation_mobile_application.R

class AmbulanceDash : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ambulance_dash)

        val add = findViewById<ImageView>(R.id.imageView13)

        add.setOnClickListener {
            val intent = Intent(this, AddAmbulance::class.java)
            startActivity(intent)
        }
    }
}