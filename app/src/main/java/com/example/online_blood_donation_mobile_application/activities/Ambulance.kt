package com.example.online_blood_donation_mobile_application.activities

import android.annotation.SuppressLint
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.online_blood_donation_mobile_application.R
import com.example.online_blood_donation_mobile_application.adapter.AmbulanceAdapter
import com.example.online_blood_donation_mobile_application.models.AmbulanceModel
import com.google.firebase.database.*

class Ambulance : AppCompatActivity() {

    private lateinit var ambulanceRecyclerView: RecyclerView
    private lateinit var tvLoadingData: TextView
    private lateinit var ambulanceList: ArrayList<AmbulanceModel>
    private lateinit var dbRef: DatabaseReference

    @SuppressLint("MissingInflatedId")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ambulance)

        val back = findViewById<ImageView>(R.id.imageView12)

        back.setOnClickListener {
            val intent = Intent(this, Home::class.java)
            startActivity(intent)
        }
        ambulanceRecyclerView = findViewById(R.id.rvAmbulance)
        ambulanceRecyclerView.layoutManager = LinearLayoutManager(this)
        ambulanceRecyclerView.setHasFixedSize(true)
        tvLoadingData = findViewById(R.id.tvLoadingData)

        ambulanceList = arrayListOf<AmbulanceModel>()

        getAmbulanceData()
    }
    private fun getAmbulanceData() {

        ambulanceRecyclerView.visibility = View.GONE
        tvLoadingData.visibility = View.VISIBLE

        dbRef = FirebaseDatabase.getInstance().getReference("Ambulance")

        dbRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {
                ambulanceList.clear()
                if (snapshot.exists()){
                    for (empSnap in snapshot.children){
                        val ambulanceData = empSnap.getValue(AmbulanceModel::class.java)
                        ambulanceList.add(ambulanceData!!)
                    }
                    val mAdapter = AmbulanceAdapter(ambulanceList)
                    ambulanceRecyclerView.adapter = mAdapter

//                    mAdapter.setOnItemClickListener(object : DonorAdapter.onItemClickListener{
//                        override fun onItemClick(position: Int) {
//
//                            val intent = Intent(this@Donarfeaching, DonarDetails::class.java)
//
//                            //put extras
//                            intent.putExtra("donatorId", donorList[position].donatorId)
//                            intent.putExtra("name", donorList[position].name)
//                            intent.putExtra("group", donorList[position].group)
//                            intent.putExtra("address", donorList[position].address)
//                            intent.putExtra("number", donorList[position].number)
//                            startActivity(intent)
//                        }
//
//                    })

                    ambulanceRecyclerView.visibility = View.VISIBLE
                    tvLoadingData.visibility = View.GONE
                }
            }

            override fun onCancelled(error: DatabaseError) {
                TODO("Not yet implemented")
            }

        })
    }
}